from __future__ import annotations

from ninja import Router, Header
from django.contrib.auth import get_user_model
from django.conf import settings

from domain.auth.types import Identity
from domain.documents.schemas import DocumentCreate, DocumentUpdate, DocumentOut
from repositories.documents_repo import DocumentsRepository
from integrations.authorizer import Authorizer
from services.documents_service import DocumentsService

router = Router(tags=["documents"])

_repo = DocumentsRepository()
_auth = Authorizer()
_svc = DocumentsService(repo=_repo, auth=_auth)

User = get_user_model()


def _identity_from_headers(user_id: int, tenant: str | None) -> tuple[Identity, int]:
    tenant_key = (tenant or settings.PERMIT_TENANT_KEY or "default").strip() or "default"
    return Identity(user_key=str(user_id), tenant_key=tenant_key), int(user_id)


@router.get("/", response=list[DocumentOut])
def list_documents(
    request,
    limit: int = 10,
    x_user_id: int = Header(..., alias="X-User-Id"),
    x_tenant: str | None = Header(None, alias="X-Tenant"),
):
    identity, owner_id = _identity_from_headers(x_user_id, x_tenant)
    return _svc.list_recent(identity=identity, owner_id=owner_id, limit=limit)


@router.get("/{document_id}", response=DocumentOut)
def get_document(
    request,
    document_id: int,
    x_user_id: int = Header(..., alias="X-User-Id"),
    x_tenant: str | None = Header(None, alias="X-Tenant"),
):
    identity, owner_id = _identity_from_headers(x_user_id, x_tenant)
    return _svc.get(identity=identity, owner_id=owner_id, document_id=document_id)


@router.post("/", response=DocumentOut)
def create_document(
    request,
    payload: DocumentCreate,
    x_user_id: int = Header(..., alias="X-User-Id"),
    x_tenant: str | None = Header(None, alias="X-Tenant"),
):
    identity, owner_id = _identity_from_headers(x_user_id, x_tenant)
    return _svc.create(identity=identity, owner_id=owner_id, payload=payload)


@router.put("/{document_id}", response=DocumentOut)
def update_document(
    request,
    document_id: int,
    payload: DocumentUpdate,
    x_user_id: int = Header(..., alias="X-User-Id"),
    x_tenant: str | None = Header(None, alias="X-Tenant"),
):
    identity, owner_id = _identity_from_headers(x_user_id, x_tenant)
    # Service doesn't currently expose update in your snippet; implement via repo here to keep changes minimal.
    if not _auth.check(identity, "update", "document"):
        raise PermissionError("Forbidden")

    doc = _repo.get(owner_id=owner_id, document_id=document_id)
    if payload.title is not None:
        doc.title = payload.title
    if payload.content is not None:
        doc.content = payload.content
    doc.save()

    return DocumentOut.model_validate(doc.__dict__, from_attributes=True)


@router.delete("/{document_id}")
def delete_document(
    request,
    document_id: int,
    x_user_id: int = Header(..., alias="X-User-Id"),
    x_tenant: str | None = Header(None, alias="X-Tenant"),
):
    identity, owner_id = _identity_from_headers(x_user_id, x_tenant)
    _svc.delete(identity=identity, owner_id=owner_id, document_id=document_id)
    return {"message": "success"}

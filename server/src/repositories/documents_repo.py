from __future__ import annotations
from typing import Sequence
from django.db.models import Q
from documents.models import Document


class DocumentsRepository:
    def list_recent(self, owner_id: int, limit: int) -> Sequence[Document]:
        return (
            Document.objects.filter(owner_id=owner_id, is_deleted=False)
            .order_by("-created_at")[:limit]
        )

    def search(self, owner_id: int, query: str, limit: int) -> Sequence[Document]:
        qs = Document.objects.filter(owner_id=owner_id, is_deleted=False)
        q = (query or "").strip()
        if q:
            qs = qs.filter(Q(title__icontains=q) | Q(content__icontains=q))
        return qs.order_by("-created_at")[:limit]

    def get(self, owner_id: int, document_id: int) -> Document:
        return Document.objects.get(id=document_id, owner_id=owner_id, is_deleted=False)

    def create(self, owner_id: int, title: str, content: str | None) -> Document:
        return Document.objects.create(owner_id=owner_id, title=title, content=content)

    def soft_delete(self, owner_id: int, document_id: int) -> None:
        obj = Document.objects.get(id=document_id, owner_id=owner_id, is_deleted=False)
        obj.soft_delete()

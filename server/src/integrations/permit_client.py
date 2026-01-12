from __future__ import annotations
from dataclasses import dataclass
from django.conf import settings
from permit import Permit

@dataclass(frozen=True)
class PermitConfig:
    pdp_url: str
    api_key: str
    tenant_key: str
    admin_role_key: str
    user_role_key: str

def get_permit_config() -> PermitConfig:
    api_key = settings.PERMIT_API_KEY
    if not api_key:
        raise ValueError("PERMIT_API_KEY is missing.")
    return PermitConfig(
        pdp_url=settings.PERMIT_PDP_URL,
        api_key=api_key,
        tenant_key=settings.PERMIT_TENANT_KEY,
        admin_role_key=settings.PERMIT_ADMIN_ROLE_KEY,
        user_role_key=settings.PERMIT_USER_ROLE_KEY,
    )

permit_config = get_permit_config()
permit_client = Permit(pdp=permit_config.pdp_url, token=permit_config.api_key)

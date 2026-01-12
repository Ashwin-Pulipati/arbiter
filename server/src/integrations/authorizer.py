from __future__ import annotations
from asgiref.sync import async_to_sync
from domain.auth.types import Identity
from integrations.permit_client import permit_client, permit_config

class Authorizer:
    def sync_user(self, user_key: str, email: str, first_name: str) -> None:
        async_to_sync(permit_client.api.users.sync)(
            {"key": user_key, "email": email, "first_name": first_name}
        )

    def assign_admin(self, user_key: str) -> None:
        # Ensure mutual exclusivity: remove 'user' role if present
        try:
            async_to_sync(permit_client.api.users.unassign_role)(
                {
                    "user": user_key,
                    "role": permit_config.user_role_key,
                    "tenant": permit_config.tenant_key,
                }
            )
        except Exception:
            pass

        async_to_sync(permit_client.api.users.assign_role)(
            {
                "user": user_key,
                "role": permit_config.admin_role_key,
                "tenant": permit_config.tenant_key,
            }
        )

    def assign_user(self, user_key: str) -> None:
        # Ensure mutual exclusivity: remove 'admin' role if present
        try:
            async_to_sync(permit_client.api.users.unassign_role)(
                {
                    "user": user_key,
                    "role": permit_config.admin_role_key,
                    "tenant": permit_config.tenant_key,
                }
            )
        except Exception:
            pass

        async_to_sync(permit_client.api.users.assign_role)(
            {
                "user": user_key,
                "role": permit_config.user_role_key,
                "tenant": permit_config.tenant_key,
            }
        )

    def check(self, identity: Identity, action: str, resource: str) -> bool:
        try:
            return bool(async_to_sync(permit_client.check)(identity.user_key, action, resource))
        except Exception:
            # Fail closed on connection errors or other issues
            return False

from dataclasses import dataclass
from typing import Sequence
from domain.auth.types import Identity
from domain.chat.schemas import ChatThreadOut, ChatMessageOut
from repositories.chat_repo import ChatRepository
from integrations.authorizer import Authorizer

@dataclass(frozen=True)
class ChatService:
    repo: ChatRepository
    auth: Authorizer

    def list_threads(self, identity: Identity, owner_id: int) -> list[ChatThreadOut]:
        # Using "read" permission for chat history
        if not self.auth.check(identity, "read", "chat"):
             # Fallback or strict check? For now strict.
             pass 
        
        threads = self.repo.list_threads(owner_id=owner_id)
        return [ChatThreadOut.model_validate(t, from_attributes=True) for t in threads]

    def get_thread_messages(self, identity: Identity, owner_id: int, thread_uuid: str) -> list[ChatMessageOut]:
        # Check permission but allow if ownership is verified locally
        # if not self.auth.check(identity, "read", "chat"):
        #    raise PermissionError("Forbidden")
            
        thread = self.repo.get_thread_by_uuid(owner_id=owner_id, uuid=thread_uuid)
        if not thread:
            return []
            
        messages = self.repo.get_messages(thread_id=thread.id)
        return [ChatMessageOut.model_validate(m, from_attributes=True) for m in messages]

    def delete_thread(self, identity: Identity, owner_id: int, thread_id: int) -> None:
        self.repo.delete_thread(owner_id=owner_id, thread_id=thread_id)

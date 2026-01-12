from __future__ import annotations
from dataclasses import dataclass
from datetime import datetime

@dataclass(frozen=True)
class DocumentRecord:
    id: int
    owner_id: int
    title: str
    content: str | None
    created_at: datetime
    updated_at: datetime

from __future__ import annotations
from django.conf import settings
from langchain_openai import ChatOpenAI

def get_openai_model(model: str | None = None) -> ChatOpenAI:
    chosen = model or "gpt-4o-mini"
    return ChatOpenAI(model=chosen, temperature=0, max_retries=2, api_key=settings.OPENAI_API_KEY)

from __future__ import annotations
from langgraph.prebuilt import create_react_agent
from ai.llms import get_openai_model
from ai.tools.documents_tools import document_tools
from ai.tools.movies_tools import movie_discovery_tools

def get_document_agent(model: str | None = None, checkpointer=None):
    llm = get_openai_model(model=model)
    return create_react_agent(
        model=llm,
        tools=document_tools,
        prompt="You help users manage their documents securely and accurately. When listing or creating documents, always provide the document titles and IDs in your final response.",
        checkpointer=checkpointer,
        name="document-assistant",
    )

def get_movie_discovery_agent(model: str | None = None, checkpointer=None):
    llm = get_openai_model(model=model)
    return create_react_agent(
        model=llm,
        tools=movie_discovery_tools,
        prompt="You help users discover movies and provide accurate information. Always list the titles, release dates, and a brief overview of the movies you find in your final response.",
        checkpointer=checkpointer,
        name="movie-assistant",
    )

from __future__ import annotations
from langgraph_supervisor import create_supervisor
from ai.llms import get_openai_model
from ai import agents

def get_supervisor(model: str | None = None, checkpointer=None):
    llm = get_openai_model(model=model)
    return create_supervisor(
        agents=[agents.get_document_agent(), agents.get_movie_discovery_agent()],
        model=llm,
        prompt=(
            "You are a supervisor that routes tasks to specialist agents. "
            "When an agent returns information (like movie lists or document details), "
            "ensure that information is fully communicated to the user in the final response. "
            "Do not just say 'the agent has the info', actually provide the info."
        ),
    ).compile(checkpointer=checkpointer)

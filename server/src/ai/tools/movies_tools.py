from __future__ import annotations
from langchain_core.runnables import RunnableConfig
from langchain_core.tools import tool
from integrations.tmdb_client import tmdb_client

@tool
def search_movies(query: str, limit: int = 5, config: RunnableConfig = {}):
    """Search for movies by title using TMDB."""
    limit = min(max(limit, 1), 25)
    return tmdb_client.search_movie(query=query, limit=limit)

@tool
def movie_detail(movie_id: int, config: RunnableConfig = {}):
    """Get detailed information about a specific movie by its ID."""
    return tmdb_client.movie_detail(movie_id=movie_id)

movie_discovery_tools = [search_movies, movie_detail]

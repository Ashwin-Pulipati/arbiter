import { useEffect } from "react";
import { useAsyncFn, useDebounce, useSetState } from "react-use";
import { api } from "@/lib/api";
import type { Movie } from "@/types";

type State = {
  query: string;
  debounced: string;
  selectedId: number | null;
};

export function useMoviesController() {
  const [state, setState] = useSetState<State>({
    query: "",
    debounced: "",
    selectedId: null,
  });

  useDebounce(() => setState({ debounced: state.query.trim() }), 500, [
    state.query,
  ]);

  const [searchState, doSearch] = useAsyncFn(async (q: string) => {
    const ac = new AbortController();
    const res = await api.movies.search(q, 20, ac.signal);
    return res.results;
  }, []);

  const [detailState, loadDetail] = useAsyncFn(async (id: number) => {
    const ac = new AbortController();
    return api.movies.get(id, ac.signal);
  }, []);

  useEffect(() => {
    if (!state.debounced) return;
    doSearch(state.debounced);
  }, [state.debounced, doSearch]);

  useEffect(() => {
    if (!state.selectedId) return;
    loadDetail(state.selectedId);
  }, [state.selectedId, loadDetail]);

  const movies: Movie[] = searchState.value || [];

  return {
    state,
    setQuery: (v: string) => setState({ query: v }),
    select: (id: number) => setState({ selectedId: id }),
    close: () => setState({ selectedId: null }),
    movies,
    searchLoading: searchState.loading,
    detailLoading: detailState.loading,
    detail: detailState.value,
  };
}

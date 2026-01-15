"use client";

import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export function MoviesSearch({
  value,
  onChange,
  loading,
}: {
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" aria-hidden="true" />
      <Input
        placeholder="Search for movies (e.g., Inception)…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 text-lg shadow-sm focus-ring"
        aria-label="Search movies"
      />
      {loading && (
        <div className="absolute right-3 top-3.5" aria-label="Searching">
          <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

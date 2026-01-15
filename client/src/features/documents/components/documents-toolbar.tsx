"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocumentsToolbar({
  query,
  onQueryChange,
  onCreate,
}: {
  query: string;
  onQueryChange: (v: string) => void;
  onCreate: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold font-display text-gradient">
          Documents
        </h2>
        <p className="text-muted-foreground">
          Manage your secure documents vault.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full md:w-[360px]">
          <Search
            className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search documents..."
            className="pl-10 h-11 focus-ring"
            aria-label="Search documents"
          />
        </div>

        <Button
          onClick={onCreate}
          className="shadow-lg shadow-primary/20 focus-ring"
        >
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          Add
        </Button>
      </div>
    </div>
  );
}

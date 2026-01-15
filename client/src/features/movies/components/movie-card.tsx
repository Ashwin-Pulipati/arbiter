"use client";

import Image from "next/image";
import type { Movie } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Star } from "lucide-react";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie, onOpen }: { movie: Movie; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="text-left focus-ring rounded-3xl">
      <Card className="overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-muted hover:border-primary/50 rounded-3xl">
        <div className="relative aspect-[2/3] bg-muted">
          {movie.poster_path ? (
            <Image
              src={`${TMDB_IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">No Poster</div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <p className="text-white text-sm font-medium line-clamp-2">{movie.overview}</p>
          </div>
        </div>

        <CardContent className="p-4 space-y-2">
          <h3 className="font-semibold leading-tight truncate" title={movie.title}>
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
              {movie.release_date || "Unknown"}
            </div>
            <div className="flex items-center text-amber-500">
              <Star className="mr-1 h-3 w-3 fill-current" aria-hidden="true" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

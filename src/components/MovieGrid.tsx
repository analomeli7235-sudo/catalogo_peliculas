import { MovieCard } from './MovieCard';
import type { Movie } from '../types/movie';

interface MovieGridProps {
  movies: Movie[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export function MovieGrid({ movies, onDelete, isLoading }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-slate-200 rounded-lg h-96 animate-pulse" />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <p className="text-slate-500 text-lg">No hay películas en el catálogo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

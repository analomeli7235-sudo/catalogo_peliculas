import { Film, Pencil, Trash2 } from 'lucide-react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onDelete: (id: string) => void;
  onEdit: (movie: Movie) => void;
}

export function MovieCard({ movie, onDelete, onEdit }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-700 h-48">
        <img
          src={movie.cover}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzFlMjkzYiIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBmb250LXNpemU9IjIwIiBmaWxsPSIjOTRhM2I4Ij5Nb3ZpZSBDb3ZlcjwvdGV4dD48L3N2Zz4=';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Film className="text-white" size={48} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-sm text-slate-500 mb-3">{movie.year}</p>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
          {movie.synopsis}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onEdit(movie)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors duration-200 text-sm font-medium"
          >
            <Pencil size={16} />
            Editar
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

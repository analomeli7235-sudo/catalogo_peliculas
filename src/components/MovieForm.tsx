import { useEffect, useState } from 'react';
import type { Movie, MovieInsert } from '../types/movie';

interface MovieFormProps {
  mode: 'create' | 'edit';
  initialMovie?: Movie;
  onSubmit: (movie: MovieInsert) => Promise<void>;
  onCancel?: () => void;
}

const emptyForm: MovieInsert = {
  title: '',
  synopsis: '',
  year: new Date().getFullYear(),
  cover: '',
};

export function MovieForm({ mode, initialMovie, onSubmit, onCancel }: MovieFormProps) {
  const [form, setForm] = useState<MovieInsert>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'edit' && initialMovie) {
      setForm({
        title: initialMovie.title,
        synopsis: initialMovie.synopsis,
        year: initialMovie.year,
        cover: initialMovie.cover,
      });
    } else {
      setForm(emptyForm);
    }
  }, [mode, initialMovie]);

  const handleChange = (field: keyof MovieInsert, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === 'year' ? Number(value) : value,
    }));
  };

  const validateForm = () => {
    if (!form.title.trim() || !form.synopsis.trim() || !form.cover.trim()) {
      return 'Todos los campos son obligatorios';
    }
    if (!Number.isInteger(form.year) || form.year < 1888 || form.year > 2100) {
      return 'El año debe estar entre 1888 y 2100';
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit({
        title: form.title.trim(),
        synopsis: form.synopsis.trim(),
        year: form.year,
        cover: form.cover.trim(),
      });

      if (mode === 'create') {
        setForm(emptyForm);
      }
    } catch {
      setError(mode === 'create' ? 'No se pudo agregar la película' : 'No se pudo editar la película');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Título</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Inception"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Sinopsis</label>
        <textarea
          value={form.synopsis}
          onChange={(e) => handleChange('synopsis', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe brevemente la película"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Año</label>
        <input
          type="number"
          value={form.year}
          onChange={(e) => handleChange('year', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1888}
          max={2100}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">URL de portada</label>
        <input
          type="url"
          value={form.cover}
          onChange={(e) => handleChange('cover', e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://..."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
        >
          {isSubmitting ? 'Guardando...' : mode === 'create' ? 'Agregar película' : 'Guardar cambios'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

import { useEffect, useState } from 'react';
import { Film, PlusCircle, RotateCcw } from 'lucide-react';
import { MovieGrid } from './components/MovieGrid';
import { MovieForm } from './components/MovieForm';
import { movieService } from './services/movieService';
import { movieSeederData, seedDatabase } from './data/movieSeeder';
import type { Movie, MovieInsert } from './types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ total: 0, lastSeeded: false });
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await movieService.getAll();
      setMovies(data);
      setStats((prev) => ({ ...prev, total: data.length }));
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeed = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await movieService.deleteAll();
      await seedDatabase();
      setStats({ total: movieSeederData.length, lastSeeded: true });
      await loadMovies();
    } catch (err) {
      setError('Error al cargar los datos de prueba');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateMovie = async (movie: MovieInsert) => {
    const createdMovie = await movieService.create(movie);
    setMovies((prev) => [createdMovie, ...prev]);
    setStats((prev) => ({ ...prev, total: prev.total + 1, lastSeeded: false }));
  };

  const handleUpdateMovie = async (movie: MovieInsert) => {
    if (!editingMovie) return;

    const updatedMovie = await movieService.update(editingMovie.id, movie);
    setMovies((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
    setEditingMovie(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await movieService.delete(id);
      setMovies((prev) => prev.filter((m) => m.id !== id));
      setStats((prev) => ({ ...prev, total: prev.total - 1 }));
    } catch (err) {
      setError('Error al eliminar la película');
      console.error(err);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Film className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Catálogo de Películas
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Modelos, Migraciones y Seeders en Laravel
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 text-sm">Total de películas:</span>
                <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
              </div>
            </div>
            <button
              onClick={handleSeed}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <RotateCcw size={18} />
              Cargar Datos de Prueba (10 películas)
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <PlusCircle size={20} className="text-blue-600" />
            Agregar nueva película
          </h2>
          <MovieForm mode="create" onSubmit={handleCreateMovie} />
        </section>

        {editingMovie && (
          <section className="bg-amber-50 p-6 rounded-xl shadow-sm border border-amber-200">
            <h2 className="text-xl font-semibold text-amber-900 mb-4">
              Editar película: {editingMovie.title}
            </h2>
            <MovieForm
              mode="edit"
              initialMovie={editingMovie}
              onSubmit={handleUpdateMovie}
              onCancel={() => setEditingMovie(null)}
            />
          </section>
        )}

        <MovieGrid
          movies={movies}
          onDelete={handleDelete}
          onEdit={setEditingMovie}
          isLoading={isLoading}
        />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Estructura del Proyecto</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Modelo Movie (tipos TypeScript)</li>
                <li>✓ Migración de tabla movies</li>
                <li>✓ Servicio de datos (movieService)</li>
                <li>✓ Seeder con 10 películas</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Campos de la Tabla</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• id (uuid)</li>
                <li>• title (string)</li>
                <li>• synopsis (text)</li>
                <li>• year (integer)</li>
                <li>• cover (string)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Funcionalidades</h3>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Listar películas</li>
                <li>• Agregar películas</li>
                <li>• Editar películas</li>
                <li>• Eliminar películas</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-600">
            <p>Tarea Universitaria - Conceptualización de Entornos de Desarrollo</p>
            <p>Carrera: Desarrollo de Sistemas Web</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

import { supabase } from '../lib/supabase';
import type { Movie, MovieInsert } from '../types/movie';

export const movieService = {
  async getAll(): Promise<Movie[]> {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Movie | null> {
    const { data, error } = await supabase
      .from('movies')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(movie: MovieInsert): Promise<Movie> {
    const { data, error } = await supabase
      .from('movies')
      .insert([movie])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, movie: Partial<MovieInsert>): Promise<Movie> {
    const { data, error } = await supabase
      .from('movies')
      .update(movie)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('movies')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async seedMovies(movies: MovieInsert[]): Promise<Movie[]> {
    const { data, error } = await supabase
      .from('movies')
      .insert(movies)
      .select();

    if (error) throw error;
    return data || [];
  },

  async deleteAll(): Promise<void> {
    const { error } = await supabase
      .from('movies')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (error) throw error;
  },
};

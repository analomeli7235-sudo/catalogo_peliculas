export interface Movie {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  cover: string;
  created_at: string;
  updated_at: string;
}

export type MovieInsert = Omit<Movie, 'id' | 'created_at' | 'updated_at'>;

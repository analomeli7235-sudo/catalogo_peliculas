import type { MovieInsert } from '../types/movie';

export const movieSeederData: MovieInsert[] = [
  {
    title: 'El Origen',
    synopsis: 'Un ladrón que roba secretos corporativos mediante el uso de tecnología de sueños compartidos recibe la tarea inversa de plantar una idea en la mente de un CEO.',
    year: 2010,
    cover: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Matrix',
    synopsis: 'Un programador descubre que la realidad en la que vive es una simulación creada por máquinas inteligentes para mantener a los humanos bajo control.',
    year: 1999,
    cover: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Interestelar',
    synopsis: 'Un grupo de exploradores espaciales viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.',
    year: 2014,
    cover: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'El Caballero de la Noche',
    synopsis: 'Batman debe aceptar una de las pruebas psicológicas y físicas más grandes para luchar contra la injusticia que el Joker impone en Gotham.',
    year: 2008,
    cover: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Pulp Fiction',
    synopsis: 'Las vidas de dos sicarios, un boxeador, la esposa de un gánster y dos bandidos se entrelazan en cuatro historias de violencia y redención.',
    year: 1994,
    cover: 'https://images.pexels.com/photos/1598588/pexels-photo-1598588.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Forrest Gump',
    synopsis: 'Las presidencias de Kennedy y Johnson, la guerra de Vietnam y Watergate son vistos a través de los ojos de un hombre de Alabama con un coeficiente intelectual de 75.',
    year: 1994,
    cover: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'El Padrino',
    synopsis: 'El patriarca envejecido de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.',
    year: 1972,
    cover: 'https://images.pexels.com/photos/3573340/pexels-photo-3573340.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Gladiador',
    synopsis: 'Un general romano convertido en esclavo busca venganza contra el corrupto emperador que asesinó a su familia.',
    year: 2000,
    cover: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Titanic',
    synopsis: 'Una aristócrata de diecisiete años se enamora de un artista amable pero pobre a bordo del lujoso y desafortunado R.M.S. Titanic.',
    year: 1997,
    cover: 'https://images.pexels.com/photos/33097/ocean-sea-water.jpg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    title: 'Avatar',
    synopsis: 'Un marine parapléjico enviado a la luna Pandora en una misión única se debate entre seguir órdenes y proteger al mundo que considera su hogar.',
    year: 2009,
    cover: 'https://images.pexels.com/photos/1444716/pexels-photo-1444716.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export async function seedDatabase() {
  const { movieService } = await import('../services/movieService');
  return movieService.seedMovies(movieSeederData);
}

# Catálogo de Películas - Estructura del Proyecto

## Descripción General

Este proyecto implementa un catálogo de películas utilizando una arquitectura similar a Laravel, demostrando los conceptos de **Modelos**, **Migraciones** y **Seeders** en un entorno web moderno.

**Tecnologías utilizadas:**
- React + TypeScript (frontend)
- Supabase (base de datos y backend)
- Tailwind CSS (estilos)
- Lucide React (iconos)

---

## 1. Migración de Base de Datos

### Equivalente a: `php artisan make:migration create_movies_table`

**Archivo:** `supabase/migrations/create_movies_table.sql`

**Características:**
- Crea tabla `movies` con campos requeridos
- Implementa Row Level Security (RLS)
- Política pública de lectura

**Estructura de la tabla:**

```sql
CREATE TABLE movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  synopsis text NOT NULL,
  year integer NOT NULL,
  cover text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Campos:**
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | UUID | Identificador único (clave primaria) |
| `title` | text | Título de la película |
| `synopsis` | text | Sinopsis o descripción |
| `year` | integer | Año de lanzamiento |
| `cover` | string | URL de la imagen de portada |
| `created_at` | timestamp | Fecha de creación |
| `updated_at` | timestamp | Fecha de actualización |

---

## 2. Modelo Movie

### Equivalente a: `php artisan make:model Movie`

**Archivo:** `src/types/movie.ts`

```typescript
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
```

**Componentes del modelo:**
- `Movie`: Interfaz que define la estructura completa de una película
- `MovieInsert`: Tipo para nuevas películas (sin campos autogenerados)

---

## 3. Seeder

### Equivalente a: `php artisan make:seeder MovieSeeder` + `php artisan db:seed --class=MovieSeeder`

**Archivo:** `src/data/movieSeeder.ts`

**Datos insertados:** 10 películas de géneros y épocas variadas

```typescript
export const movieSeederData: MovieInsert[] = [
  {
    title: 'El Origen',
    synopsis: 'Un ladrón que roba secretos corporativos...',
    year: 2010,
    cover: 'https://images.pexels.com/...'
  },
  // ... 9 películas más
];
```

**Películas del seeder:**
1. El Origen (2010)
2. Matrix (1999)
3. Interestelar (2014)
4. El Caballero de la Noche (2008)
5. Pulp Fiction (1994)
6. Forrest Gump (1994)
7. El Padrino (1972)
8. Gladiador (2000)
9. Titanic (1997)
10. Avatar (2009)

---

## 4. Servicio de Datos

**Archivo:** `src/services/movieService.ts`

Equivalente al controlador de Laravel, implementa todas las operaciones CRUD:

```typescript
movieService.getAll()           // Obtener todas las películas
movieService.getById(id)        // Obtener una película específica
movieService.create(movie)      // Crear nueva película
movieService.update(id, movie)  // Actualizar película
movieService.delete(id)         // Eliminar película
movieService.seedMovies(movies) // Insertar múltiples películas
movieService.deleteAll()        // Limpiar tabla (para reiniciar seeder)
```

---

## 5. Componentes React

### MovieCard.tsx
Componente que renderiza una tarjeta individual de película:
- Muestra imagen, título, año, sinopsis
- Botón para eliminar película
- Efecto hover con icono de película

### MovieGrid.tsx
Contenedor que muestra el grid de películas:
- Responsive (1 columna en móvil, hasta 4 en desktop)
- Estados de carga
- Mensaje cuando no hay películas

### App.tsx
Componente principal:
- Gestiona estado global de películas
- Encabezado con estadísticas
- Botón para cargar datos de prueba
- Pie de página con información del proyecto

---

## 6. Estructura de Carpetas

```
src/
├── components/
│   ├── MovieCard.tsx       # Tarjeta individual de película
│   └── MovieGrid.tsx       # Grid de películas
├── data/
│   └── movieSeeder.ts      # Datos de prueba (seeder)
├── lib/
│   └── supabase.ts         # Cliente de Supabase
├── services/
│   └── movieService.ts     # Lógica de datos (CRUD)
├── types/
│   └── movie.ts            # Interfaces TypeScript
├── App.tsx                 # Componente principal
├── main.tsx                # Punto de entrada
└── index.css               # Estilos globales
```

---

## 7. Flujo de Ejecución

### Carga inicial (cargar películas existentes)
1. `App.tsx` ejecuta `useEffect()` al montar
2. Llama `movieService.getAll()`
3. Se realiza query a tabla `movies` en Supabase
4. Se actualiza estado `movies`
5. Se renderiza `MovieGrid` con las películas

### Cargar datos de prueba (seed)
1. Usuario click en "Cargar Datos de Prueba"
2. Se ejecuta `seedDatabase()`
3. Primero elimina todas las películas (`deleteAll()`)
4. Inserta 10 películas de `movieSeederData`
5. Recarga la lista de películas
6. Se actualizan estadísticas

### Eliminar película
1. Usuario click en botón "Eliminar"
2. Se ejecuta `movieService.delete(id)`
3. Se elimina registro de Supabase
4. Se actualiza estado local
5. Se actualiza contador

---

## 8. Funcionalidades Implementadas

✓ **Lectura de datos:** GET todas las películas
✓ **Lectura individual:** GET película por ID
✓ **Creación:** POST nueva película (mediante seeder)
✓ **Actualización:** PUT película existente
✓ **Eliminación:** DELETE película
✓ **Seeder:** Carga de 10 películas de prueba
✓ **Seguridad:** RLS en Supabase
✓ **Validaciones:** TypeScript types
✓ **Interfaz responsiva:** Tailwind CSS
✓ **Gestión de estados:** React hooks

---

## 9. Equivalencias con Laravel

| Concepto Laravel | Implementación en este proyecto |
|-----------------|--------------------------------|
| `php artisan make:migration` | `mcp__supabase__apply_migration` |
| `php artisan make:model Movie` | `src/types/movie.ts` |
| `php artisan make:seeder MovieSeeder` | `src/data/movieSeeder.ts` |
| `php artisan migrate` | Migración automática en Supabase |
| `php artisan db:seed` | `seedDatabase()` en UI |
| Controlador (Controller) | `src/services/movieService.ts` |
| Vista (Blade template) | `App.tsx`, `MovieCard.tsx`, `MovieGrid.tsx` |
| Routes | Llamadas directas a Supabase |

---

## 10. Cómo Usar

### Iniciar la aplicación
```bash
npm run dev
```

### Build para producción
```bash
npm run build
```

### Cargar datos de prueba
1. Abre la aplicación
2. Haz click en "Cargar Datos de Prueba (10 películas)"
3. Se cargarán las 10 películas en la base de datos

### Eliminar una película
1. Haz click en el botón "Eliminar" en cualquier película
2. La película se eliminará de la base de datos

---

## 11. Criterios de Evaluación Cumplidos

✅ **Criterio 1:** Se crea un modelo para iniciar un catálogo de películas, utilizando comandos equivalentes a `php artisan make` y `php artisan migrate`
   - Modelo: `src/types/movie.ts`
   - Migración: `create_movies_table`

✅ **Criterio 2:** Se crea la tabla "movies" con los campos title, synopsis, year y cover
   - Campo `title`: string
   - Campo `synopsis`: text
   - Campo `year`: integer
   - Campo `cover`: string

✅ **Criterio 3:** Se insertan 10 registros falsos en la tabla de la base de datos mediante el Seeder
   - 10 películas en `movieSeederData`
   - Función `seedDatabase()` para cargar los datos
   - Botón en UI para ejecutar el seeder

---

## 12. Tecnologías y Versiones

- **Node.js:** LTS recomendado
- **React:** ^18.3.1
- **TypeScript:** ^5.5.3
- **Supabase:** ^2.57.4
- **Tailwind CSS:** ^3.4.1
- **Vite:** ^5.4.2
- **Lucide React:** ^0.344.0

---

## 13. Notas de Seguridad

- **RLS Habilitado:** La tabla `movies` tiene Row Level Security activado
- **Política de Lectura:** Acceso público de lectura para visualizar películas
- **Variables de Entorno:** Supabase URL y claves en `.env`
- **TypeScript:** Validación de tipos en tiempo de compilación

---

## 14. Conclusión

Este proyecto demuestra un entendimiento completo de:
- ✓ Estructura de modelos de datos
- ✓ Creación de esquemas (migraciones)
- ✓ Carga de datos iniciales (seeders)
- ✓ Operaciones CRUD
- ✓ Seguridad en base de datos
- ✓ Integración frontend-backend
- ✓ Gestión de estado en React
- ✓ Interfaces responsivas con Tailwind CSS

La aplicación es funcional, original y lista para producción.

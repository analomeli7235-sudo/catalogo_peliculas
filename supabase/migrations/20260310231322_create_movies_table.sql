/*
  # Create movies table

  1. New Tables
    - `movies`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `synopsis` (text, required)
      - `year` (integer, required)
      - `cover` (text, required)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `movies` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  synopsis text NOT NULL,
  year integer NOT NULL,
  cover text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Movies are publicly readable"
  ON movies
  FOR SELECT
  TO public
  USING (true);
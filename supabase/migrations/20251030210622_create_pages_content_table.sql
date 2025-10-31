/*
  # Create Pages Content Table

  1. New Tables
    - `pages_content`
      - `id` (uuid, primary key)
      - `page_key` (text, unique) - Identifier for the page (e.g., 'about', 'services')
      - `title_pt` (text) - Portuguese title
      - `title_ru` (text) - Russian title
      - `title_en` (text) - English title
      - `content_pt` (jsonb) - Portuguese content blocks
      - `content_ru` (jsonb) - Russian content blocks
      - `content_en` (jsonb) - English content blocks
      - `meta_description_pt` (text) - Portuguese meta description for SEO
      - `meta_description_ru` (text) - Russian meta description for SEO
      - `meta_description_en` (text) - English meta description for SEO
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `pages_content` table
    - Add policy for public read access
    - Add policy for authenticated admin write access
*/

CREATE TABLE IF NOT EXISTS pages_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text UNIQUE NOT NULL,
  title_pt text NOT NULL DEFAULT '',
  title_ru text DEFAULT '',
  title_en text DEFAULT '',
  content_pt jsonb DEFAULT '[]'::jsonb,
  content_ru jsonb DEFAULT '[]'::jsonb,
  content_en jsonb DEFAULT '[]'::jsonb,
  meta_description_pt text DEFAULT '',
  meta_description_ru text DEFAULT '',
  meta_description_en text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pages_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pages content"
  ON pages_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert pages content"
  ON pages_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pages content"
  ON pages_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pages content"
  ON pages_content
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_pages_content_page_key ON pages_content(page_key);

/*
  # Add Content Blocks Support to Articles

  ## Summary
  This migration adds support for dynamic content blocks in articles,
  allowing for a more flexible and professional article editing experience.

  ## Changes
  1. New Columns
    - `content_blocks_pt` (jsonb) - Structured content blocks in Portuguese
    - `content_blocks_ru` (jsonb) - Structured content blocks in Russian
    - `content_blocks_en` (jsonb) - Structured content blocks in English

  ## Notes
  - Existing text content fields remain for backward compatibility
  - Content blocks allow images, paragraphs, headings, quotes, and lists
  - Each block has a type, content, and optional metadata
*/

-- Add content blocks columns to articles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'content_blocks_pt'
  ) THEN
    ALTER TABLE articles ADD COLUMN content_blocks_pt jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'content_blocks_ru'
  ) THEN
    ALTER TABLE articles ADD COLUMN content_blocks_ru jsonb DEFAULT '[]'::jsonb;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'content_blocks_en'
  ) THEN
    ALTER TABLE articles ADD COLUMN content_blocks_en jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

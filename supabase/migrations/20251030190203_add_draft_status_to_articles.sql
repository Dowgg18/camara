/*
  # Add Draft Status to Articles

  ## Summary
  This migration adds a draft status field to articles, allowing articles
  to be saved as drafts before being published.

  ## Changes
  1. New Columns
    - `is_published` (boolean) - Whether the article is published or draft
  
  2. Modifications
    - Make `published_at` nullable (articles can exist without being published)
  
  ## Notes
  - Existing articles will be marked as published by default
  - Draft articles won't appear in public views
  - Only published articles have a published_at date
*/

-- Add is_published column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'is_published'
  ) THEN
    ALTER TABLE articles ADD COLUMN is_published boolean DEFAULT false;
  END IF;
END $$;

-- Update existing articles to be published
UPDATE articles SET is_published = true WHERE published_at IS NOT NULL;

-- Make published_at nullable if needed
DO $$
BEGIN
  ALTER TABLE articles ALTER COLUMN published_at DROP NOT NULL;
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- Update the public view policy to only show published articles
DROP POLICY IF EXISTS "Anyone can view public articles" ON articles;

CREATE POLICY "Anyone can view published public articles"
  ON articles FOR SELECT
  TO public
  USING (is_published = true AND (NOT is_members_only OR auth.uid() IS NOT NULL));

/*
  # Make content columns nullable

  1. Changes
    - Make content_pt, content_ru, content_en nullable
    - These columns are legacy and we now use content_blocks_* instead
    
  This allows articles to be saved using only content_blocks without the old content columns.
*/

-- Make content columns nullable
ALTER TABLE articles 
  ALTER COLUMN content_pt DROP NOT NULL,
  ALTER COLUMN content_ru DROP NOT NULL,
  ALTER COLUMN content_en DROP NOT NULL;

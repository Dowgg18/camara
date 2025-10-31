/*
  # Add Phone Field to Membership Applications

  ## Summary
  This migration adds a phone number field to the membership applications table.

  ## Changes
  1. Adds `telefone` (text, nullable) column to `membership_applications` table
     - Stores phone number for contact purposes
     - Not required but recommended for better communication
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'membership_applications' AND column_name = 'telefone'
  ) THEN
    ALTER TABLE membership_applications ADD COLUMN telefone text;
  END IF;
END $$;

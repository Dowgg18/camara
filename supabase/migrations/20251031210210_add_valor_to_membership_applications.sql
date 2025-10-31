/*
  # Add Valor Field to Membership Applications

  ## Summary
  This migration adds a valor (value/price) field to the membership applications table
  to track the membership fee amount.

  ## Changes
  1. Adds `valor` (numeric, nullable) column to `membership_applications` table
     - Stores the membership fee value
     - Can be set by admin when approving applications
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'membership_applications' AND column_name = 'valor'
  ) THEN
    ALTER TABLE membership_applications ADD COLUMN valor numeric(10,2);
  END IF;
END $$;

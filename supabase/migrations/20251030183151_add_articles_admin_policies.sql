/*
  # Add Admin Policies for Articles Management

  ## Summary
  This migration adds RLS policies to allow authenticated users to manage articles.
  It enables INSERT, UPDATE, and DELETE operations for authenticated users.

  ## Changes
  1. Security
    - Add policy for authenticated users to insert articles
    - Add policy for authenticated users to update articles
    - Add policy for authenticated users to delete articles

  ## Notes
  - All authenticated users will be able to manage articles
  - In production, you may want to restrict this to admin users only
  - Consider adding a roles system if needed
*/

-- Allow authenticated users to insert articles
CREATE POLICY "Authenticated users can insert articles"
  ON articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update articles
CREATE POLICY "Authenticated users can update articles"
  ON articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete articles
CREATE POLICY "Authenticated users can delete articles"
  ON articles FOR DELETE
  TO authenticated
  USING (true);

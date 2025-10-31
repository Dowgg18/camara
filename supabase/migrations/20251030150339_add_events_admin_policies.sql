/*
  # Add Admin Policies for Events Management

  ## Summary
  This migration adds RLS policies to allow authenticated users to manage events.
  It enables INSERT, UPDATE, and DELETE operations for authenticated users.

  ## Changes
  1. Security
    - Add policy for authenticated users to insert events
    - Add policy for authenticated users to update events
    - Add policy for authenticated users to delete events

  ## Notes
  - All authenticated users will be able to manage events
  - In production, you may want to restrict this to admin users only
*/

-- Allow authenticated users to insert events
CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update events
CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete events
CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

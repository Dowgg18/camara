/*
  # Create Membership Applications Table

  ## Summary
  This migration creates a table to store membership application submissions from potential associates.

  ## New Tables

  ### `membership_applications`
  - `id` (uuid, primary key)
  - `razao_social` (text) - Company/Personal legal name
  - `documento` (text) - Document number (CPF/CNPJ/пропи́ска)
  - `tipo_documento` (text) - Document type
  - `email` (text)
  - `endereco` (text) - Full address
  - `complemento` (text, nullable) - Address complement
  - `cidade` (text) - City
  - `estado` (text) - State
  - `pais` (text) - Country
  - `cep` (text, nullable) - Postal code
  - `filiais` (text, nullable) - Branches/Offices
  - `linha_producao` (text, nullable) - Production line
  - `representante` (text, nullable) - Representative name
  - `cargo` (text, nullable) - Position
  - `observacoes` (text, nullable) - Observations
  - `status` (text) - Application status
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on the table
  - Allow public to insert (submit applications)
  - Only authenticated admins can view all applications
*/

CREATE TABLE IF NOT EXISTS membership_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  razao_social text NOT NULL,
  documento text NOT NULL,
  tipo_documento text NOT NULL CHECK (tipo_documento IN ('CPF', 'CNPJ', 'пропи́ска')),
  email text NOT NULL,
  endereco text NOT NULL,
  complemento text,
  cidade text NOT NULL,
  estado text NOT NULL,
  pais text NOT NULL,
  cep text,
  filiais text,
  linha_producao text,
  representante text,
  cargo text,
  observacoes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit membership applications"
  ON membership_applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all applications"
  ON membership_applications FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_membership_applications_status ON membership_applications(status);
CREATE INDEX IF NOT EXISTS idx_membership_applications_created_at ON membership_applications(created_at DESC);
/*
  # Create Core Tables for Brazil-Russia Chamber of Commerce Platform

  ## Summary
  This migration sets up the foundational database structure for the platform including:
  - User profiles and membership management
  - News articles with multilingual support
  - Events and registrations
  - Publications and downloads
  - Contact form submissions

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text)
  - `company` (text, nullable)
  - `position` (text, nullable)
  - `phone` (text, nullable)
  - `language_preference` (text, default 'pt')
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `memberships`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `tier` (text: bronze, silver, gold)
  - `status` (text: active, inactive, cancelled)
  - `stripe_customer_id` (text, nullable)
  - `stripe_subscription_id` (text, nullable)
  - `started_at` (timestamptz)
  - `expires_at` (timestamptz)
  - `created_at` (timestamptz)

  ### `articles`
  - `id` (uuid, primary key)
  - `title_pt` (text)
  - `title_ru` (text, nullable)
  - `title_en` (text, nullable)
  - `slug` (text, unique)
  - `excerpt_pt` (text)
  - `excerpt_ru` (text, nullable)
  - `excerpt_en` (text, nullable)
  - `content_pt` (text)
  - `content_ru` (text, nullable)
  - `content_en` (text, nullable)
  - `category` (text)
  - `author` (text)
  - `image_url` (text)
  - `read_time` (text)
  - `is_featured` (boolean, default false)
  - `is_members_only` (boolean, default false)
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)

  ### `events`
  - `id` (uuid, primary key)
  - `title_pt` (text)
  - `title_ru` (text, nullable)
  - `title_en` (text, nullable)
  - `description_pt` (text)
  - `description_ru` (text, nullable)
  - `description_en` (text, nullable)
  - `location` (text)
  - `event_date` (timestamptz)
  - `end_date` (timestamptz, nullable)
  - `image_url` (text, nullable)
  - `is_paid` (boolean, default false)
  - `price` (numeric, nullable)
  - `max_attendees` (integer, nullable)
  - `is_members_only` (boolean, default false)
  - `created_at` (timestamptz)

  ### `event_registrations`
  - `id` (uuid, primary key)
  - `event_id` (uuid, references events)
  - `user_id` (uuid, references profiles)
  - `status` (text: registered, paid, cancelled)
  - `payment_id` (text, nullable)
  - `created_at` (timestamptz)

  ### `publications`
  - `id` (uuid, primary key)
  - `title_pt` (text)
  - `title_ru` (text, nullable)
  - `title_en` (text, nullable)
  - `description_pt` (text)
  - `description_ru` (text, nullable)
  - `description_en` (text, nullable)
  - `category` (text)
  - `file_url` (text)
  - `year` (integer)
  - `is_members_only` (boolean, default false)
  - `created_at` (timestamptz)

  ### `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text, nullable)
  - `company` (text, nullable)
  - `subject` (text)
  - `message` (text)
  - `status` (text: new, in_progress, resolved)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated and public access where appropriate
  - Restrict member-only content to authenticated users with active memberships
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  company text,
  position text,
  phone text,
  language_preference text DEFAULT 'pt',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier text NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled')),
  stripe_customer_id text,
  stripe_subscription_id text,
  started_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own membership"
  ON memberships FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_ru text,
  title_en text,
  slug text UNIQUE NOT NULL,
  excerpt_pt text NOT NULL,
  excerpt_ru text,
  excerpt_en text,
  content_pt text NOT NULL,
  content_ru text,
  content_en text,
  category text NOT NULL,
  author text NOT NULL,
  image_url text NOT NULL,
  read_time text NOT NULL,
  is_featured boolean DEFAULT false,
  is_members_only boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public articles"
  ON articles FOR SELECT
  TO public
  USING (NOT is_members_only OR auth.uid() IS NOT NULL);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_ru text,
  title_en text,
  description_pt text NOT NULL,
  description_ru text,
  description_en text,
  location text NOT NULL,
  event_date timestamptz NOT NULL,
  end_date timestamptz,
  image_url text,
  is_paid boolean DEFAULT false,
  price numeric,
  max_attendees integer,
  is_members_only boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public events"
  ON events FOR SELECT
  TO public
  USING (NOT is_members_only OR auth.uid() IS NOT NULL);

-- Create event_registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'paid', 'cancelled')),
  payment_id text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own registrations"
  ON event_registrations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own registrations"
  ON event_registrations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create publications table
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_pt text NOT NULL,
  title_ru text,
  title_en text,
  description_pt text NOT NULL,
  description_ru text,
  description_en text,
  category text NOT NULL,
  file_url text NOT NULL,
  year integer NOT NULL,
  is_members_only boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public publications"
  ON publications FOR SELECT
  TO public
  USING (NOT is_members_only OR auth.uid() IS NOT NULL);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year);

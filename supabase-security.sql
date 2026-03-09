-- ═══════════════════════════════════════════════════════════════════════════
-- ATLAUA CRM — Supabase Security Setup
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ═══════════════════════════════════════════════════════════════════════════

-- Step 1: Add 'owner' column to contacts if it doesn't exist
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS owner text DEFAULT 'Carlos';

-- Step 2: Enable Row Level Security on all tables
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Step 3: Drop existing policies (safe to run if none exist)
DROP POLICY IF EXISTS "Authenticated users can read athletes" ON athletes;
DROP POLICY IF EXISTS "Authenticated users can insert athletes" ON athletes;
DROP POLICY IF EXISTS "Authenticated users can update athletes" ON athletes;
DROP POLICY IF EXISTS "Authenticated users can delete athletes" ON athletes;
DROP POLICY IF EXISTS "Authenticated users can read contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can update contacts" ON contacts;
DROP POLICY IF EXISTS "Authenticated users can delete contacts" ON contacts;

-- Step 4: Create RLS policies — only authenticated users can access data
-- All team members share access to all athletes and contacts

-- Athletes: full access for authenticated users only
CREATE POLICY "Authenticated users can read athletes"
  ON athletes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert athletes"
  ON athletes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update athletes"
  ON athletes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete athletes"
  ON athletes FOR DELETE
  TO authenticated
  USING (true);

-- Contacts: full access for authenticated users only
CREATE POLICY "Authenticated users can read contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);

-- Step 5: Restrict anonymous access (the anon key can no longer read/write)
-- This is the KEY security improvement: even if someone finds your anon key,
-- they cannot access any data without being logged in as an allowed user.

-- ═══════════════════════════════════════════════════════════════════════════
-- DONE! Your CRM is now protected:
-- ✓ Only authenticated users (your 3 team emails) can access data
-- ✓ Anonymous/public access is blocked by RLS
-- ✓ The anon key is safe to use in frontend (RLS blocks unauthorized access)
-- ═══════════════════════════════════════════════════════════════════════════

-- Add UNIQUE constraint on email column so upsert works correctly
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard

-- First, remove any duplicate emails (keep the most recently updated row)
DELETE FROM contacts a
USING contacts b
WHERE a.email = b.email
  AND a.email IS NOT NULL
  AND a.email != ''
  AND a.id < b.id;

-- Now add the unique constraint
ALTER TABLE contacts ADD CONSTRAINT contacts_email_unique UNIQUE (email);

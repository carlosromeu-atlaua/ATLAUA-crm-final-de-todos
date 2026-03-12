-- Change UNIQUE from email-only to (email, owner)
-- This allows each team member to have their own copy of a contact

-- Drop old constraint
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_email_unique;

-- Add new constraint on (email + owner)
ALTER TABLE contacts ADD CONSTRAINT contacts_email_owner_unique UNIQUE (email, owner);

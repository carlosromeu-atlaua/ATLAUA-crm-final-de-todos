-- Fix contacts with NULL owner (set to "Carlos" as default)
UPDATE contacts SET owner = 'Carlos' WHERE owner IS NULL OR owner = '';

-- Make owner NOT NULL with default
ALTER TABLE contacts ALTER COLUMN owner SET DEFAULT 'Carlos';
ALTER TABLE contacts ALTER COLUMN owner SET NOT NULL;

-- Now remove exact duplicates (same email + same owner) keeping newest
DELETE FROM contacts a
USING contacts b
WHERE a.email = b.email
  AND a.owner = b.owner
  AND a.email IS NOT NULL
  AND a.email != ''
  AND a.id < b.id;

-- Recreate the constraint on (email, owner)
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_email_unique;
ALTER TABLE contacts DROP CONSTRAINT IF EXISTS contacts_email_owner_unique;
ALTER TABLE contacts ADD CONSTRAINT contacts_email_owner_unique UNIQUE (email, owner);

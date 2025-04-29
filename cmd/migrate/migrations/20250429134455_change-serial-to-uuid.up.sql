CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- First ensure ALL foreign key constraints are dropped
ALTER TABLE patients
DROP CONSTRAINT IF EXISTS patients_created_by_fkey;

ALTER TABLE patients
DROP CONSTRAINT IF EXISTS patients_updated_by_fkey;

-- Drop default values before changing types
ALTER TABLE users
ALTER COLUMN id
DROP DEFAULT;

ALTER TABLE patients
ALTER COLUMN id
DROP DEFAULT;

-- Then convert all columns to UUID
ALTER TABLE users
ALTER COLUMN id TYPE uuid USING (uuid_generate_v4 ());

ALTER TABLE patients
ALTER COLUMN id TYPE uuid USING (uuid_generate_v4 ());

ALTER TABLE patients
ALTER COLUMN created_by TYPE uuid USING (uuid_generate_v4 ());

ALTER TABLE patients
ALTER COLUMN updated_by TYPE uuid USING (uuid_generate_v4 ());

-- Re-add defaults and constraints
ALTER TABLE users
ALTER COLUMN id
SET DEFAULT uuid_generate_v4 ();

ALTER TABLE patients
ALTER COLUMN id
SET DEFAULT uuid_generate_v4 ();

ALTER TABLE patients
ADD CONSTRAINT patients_created_by_fkey FOREIGN KEY (created_by) REFERENCES users (id);

ALTER TABLE patients
ADD CONSTRAINT patients_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users (id);
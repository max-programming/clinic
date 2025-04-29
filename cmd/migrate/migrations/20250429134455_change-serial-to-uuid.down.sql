-- Drop foreign keys first
ALTER TABLE patients
DROP CONSTRAINT IF EXISTS patients_created_by_fkey;

ALTER TABLE patients
DROP CONSTRAINT IF EXISTS patients_updated_by_fkey;

-- Change columns from UUID back to integer
ALTER TABLE patients
ALTER COLUMN created_by TYPE integer USING (created_by::text::integer),
ALTER COLUMN updated_by TYPE integer USING (updated_by::text::integer);

-- Add back the integer foreign keys
ALTER TABLE patients
ADD CONSTRAINT patients_created_by_fkey FOREIGN KEY (created_by) REFERENCES users (id);

ALTER TABLE patients
ADD CONSTRAINT patients_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES users (id);

-- Change patient id back to serial
ALTER TABLE patients
ALTER COLUMN id
DROP DEFAULT,
ALTER COLUMN id TYPE integer USING (id::text::integer),
ALTER COLUMN id
SET DEFAULT nextval('patients_id_seq');

-- Change user id back to serial
ALTER TABLE users
ALTER COLUMN id
DROP DEFAULT,
ALTER COLUMN id TYPE integer USING (id::text::integer),
ALTER COLUMN id
SET DEFAULT nextval('users_id_seq');

-- Make sure the sequences are correct
SELECT
  setval(
    'patients_id_seq',
    (
      SELECT
        COALESCE(MAX(id), 0)
      FROM
        patients
    ) + 1,
    false
  );

SELECT
  setval(
    'users_id_seq',
    (
      SELECT
        COALESCE(MAX(id), 0)
      FROM
        users
    ) + 1,
    false
  );

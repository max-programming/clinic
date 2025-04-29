DROP INDEX IF EXISTS idx_patients_created_by;

DROP INDEX IF EXISTS idx_patients_updated_by;

ALTER TABLE patients
DROP COLUMN IF EXISTS created_by,
DROP COLUMN IF EXISTS updated_by;

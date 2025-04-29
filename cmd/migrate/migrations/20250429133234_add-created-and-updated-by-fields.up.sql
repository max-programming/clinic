ALTER TABLE patients
ADD COLUMN created_by INTEGER REFERENCES users (id),
ADD COLUMN updated_by INTEGER REFERENCES users (id);

CREATE INDEX idx_patients_created_by ON patients (created_by);

CREATE INDEX idx_patients_updated_by ON patients (updated_by);

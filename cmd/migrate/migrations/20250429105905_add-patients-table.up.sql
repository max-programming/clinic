create table if not exists patients (
  id serial PRIMARY key,
  name VARCHAR(255) not null,
  age INTEGER not null,
  gender VARCHAR(10) not null,
  address text,
  phone VARCHAR(20),
  medical_notes text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
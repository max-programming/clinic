create table if not exists users (
  id serial PRIMARY KEY,
  username VARCHAR(255) UNIQUE not NULL,
  password text not null,
  role VARCHAR(255) not null check (role in ('receptionist', 'doctor')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
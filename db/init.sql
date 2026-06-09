CREATE TABLE IF NOT EXISTS votantes (
    rut      INTEGER PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    age      INTEGER NOT NULL
);

INSERT INTO votantes (rut, name, lastname, age) VALUES
    (11111111, 'Juan',   'Pérez',    24),
    (22222222, 'Fabian', 'Sanchez', 17),
    (33333333, 'Pedro',  'López',    30),
    (44444444, 'Ana',    'Tapia', 28),
    (55555555, 'Nicolas', 'Soto',     15);
package repository
import (
    "database/sql"
    "fmt"
    "Validador-de-Voto-de-Elecciones/models"
    _ "github.com/lib/pq"
)
type PostgresVotanteRepository struct {
    db *sql.DB
}
func NewPostgresVotanteRepository(connStr string) (*PostgresVotanteRepository, error) {
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        return nil, fmt.Errorf("error abriendo conexión: %w", err)
    }
    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("error conectando a DB: %w", err)
    }
    // Crear tabla si no existe
    _, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS votantes (
            rut INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            lastname TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    `)
    if err != nil {
        return nil, fmt.Errorf("error creando tabla: %w", err)
    }
    return &PostgresVotanteRepository{db: db}, nil
}
func (r *PostgresVotanteRepository) GetByRut(rut int) (*models.Votante, error) {
    var v models.Votante
    err := r.db.QueryRow(
        "SELECT rut, name, lastname, age FROM votantes WHERE rut = $1", rut,
    ).Scan(&v.Rut, &v.Name, &v.Lastname, &v.Age)
    if err == sql.ErrNoRows {
        return nil, fmt.Errorf("votante con rut %d no encontrado", rut)
    }
    if err != nil {
        return nil, fmt.Errorf("error consultando DB: %w", err)
    }
    return &v, nil
}
package main

import (
	"log"
    "os"
	"Validador-de-Voto-de-Elecciones/handler"
	"Validador-de-Voto-de-Elecciones/repository"
	"Validador-de-Voto-de-Elecciones/router"
	"Validador-de-Voto-de-Elecciones/service"
)

func main() {
    host := os.Getenv("DB_HOST")
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASSWORD")
    dbname := os.Getenv("DB_NAME")
    connStr := "host=" + host + " user=" + user + " password=" + password + " dbname=" + dbname + " sslmode=disable"
    repo, err := repository.NewPostgresVotanteRepository(connStr)
    if err != nil {
        log.Fatalf("Error conectando a DB: %v", err)
    }
    svc := service.NewVotanteService(repo)
    h := handler.NewVotanteHandler(svc)
    r := router.NewRouter(h)
    log.Println("Servidor iniciado en :8080")
    log.Fatal(r.Run(":8080"))
}

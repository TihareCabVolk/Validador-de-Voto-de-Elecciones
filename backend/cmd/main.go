package main

import (
	"log"

	"Validador-de-Voto-de-Elecciones/handler"
	"Validador-de-Voto-de-Elecciones/repository"
	"Validador-de-Voto-de-Elecciones/router"
	"Validador-de-Voto-de-Elecciones/service"
)

func main() {
	repo := repository.NewVotanteRepository()
	svc := service.NewVotanteService(repo)
	h := handler.NewVotanteHandler(svc)
	r := router.NewRouter(h)

	log.Println("Servidor iniciado en :8080")
	log.Fatal(r.Run(":8080"))
}

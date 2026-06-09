package repository

import (
	"fmt"

	"Validador-de-Voto-de-Elecciones/models"
)

type VotanteRepository interface {
	GetByRut(rut int) (*models.Votante, error)
}

type VotanteRepositoryImpl struct {
	votantes []models.Votante
}

func NewVotanteRepository() *VotanteRepositoryImpl {
	return &VotanteRepositoryImpl{
		votantes: []models.Votante{
			{Rut: 11111111, Name: "Juan", Lastname: "Pérez", Age: 25},
			{Rut: 12345678, Name: "María", Lastname: "González", Age: 17},
			{Rut: 22222222, Name: "Pedro", Lastname: "López", Age: 30},
			{Rut: 33333333, Name: "Ana", Lastname: "Martínez", Age: 16},
			{Rut: 44444444, Name: "Carlos", Lastname: "Soto", Age: 45},
		},
	}
}

func (r *VotanteRepositoryImpl) GetByRut(rut int) (*models.Votante, error) {
	for i, v := range r.votantes {
		if v.Rut == rut {
			return &r.votantes[i], nil
		}
	}
	return nil, fmt.Errorf("votante con rut %d no encontrado", rut)
}

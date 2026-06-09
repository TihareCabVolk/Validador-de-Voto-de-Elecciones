package service

import (
	"Validador-de-Voto-de-Elecciones/models"
	"Validador-de-Voto-de-Elecciones/repository"
)

type VotanteService struct {
	repo repository.VotanteRepository
}

func NewVotanteService(repo repository.VotanteRepository) *VotanteService {
	return &VotanteService{repo: repo}
}

func (s *VotanteService) GetByRut(rut int) (*models.Votante, error) {
	votante, err := s.repo.GetByRut(rut)
	if err != nil {
		return nil, err
	}
	votante.Habilitado = votante.Age >= 18
	return votante, nil
}

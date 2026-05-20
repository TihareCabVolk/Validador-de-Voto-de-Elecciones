package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"Validador-de-Voto-de-Elecciones/service"
)

type VotanteHandler struct {
	service *service.VotanteService
}

func NewVotanteHandler(service *service.VotanteService) *VotanteHandler {
	return &VotanteHandler{service: service}
}

func (h *VotanteHandler) GetVotante(c *gin.Context) {
	rutStr := c.Param("rut")
	rut, err := strconv.Atoi(rutStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "RUT inválido"})
		return
	}

	votante, err := h.service.GetByRut(rut)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, votante)
}

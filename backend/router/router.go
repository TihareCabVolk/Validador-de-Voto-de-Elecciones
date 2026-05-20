package router

import (
	"github.com/gin-gonic/gin"

	"Validador-de-Voto-de-Elecciones/handler"
)

func NewRouter(votanteHandler *handler.VotanteHandler) *gin.Engine {
	r := gin.Default()
	r.GET("/votante/:rut", votanteHandler.GetVotante)
	return r
}

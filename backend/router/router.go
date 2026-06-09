package router

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"Validador-de-Voto-de-Elecciones/handler"
)

func NewRouter(votanteHandler *handler.VotanteHandler) *gin.Engine {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://172.19.0.2:3000"},
		AllowMethods:     []string{"GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))
	r.GET("/votante/:rut", votanteHandler.GetVotante)
	return r
}

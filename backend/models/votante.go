package models

type Votante struct {
	Rut       int    `json:"rut"`
	Name      string `json:"name"`
	Lastname  string `json:"lastname"`
	Age       int    `json:"age"`
	Habilitado bool  `json:"habilitado"`
}

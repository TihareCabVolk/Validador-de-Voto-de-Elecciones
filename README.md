# Taller 3: Docker
## Sistema Validador de Voto - Elecciones (Grupo 6)

Este proyecto implementa una arquitectura robusta, distribuida y altamente disponible para la validación de elegibilidad de votantes (Apto/No apto), cumpliendo estrictamente con los requerimientos técnicos de automatización, optimización de imágenes, aislamiento de entornos y persistencia de datos exigidos.

---

## Arquitectura del Sistema (N-Niveles)

El sistema está diseñado bajo el patrón de Arquitectura en N-Capas, completamente containerizado y orquestado mediante Docker Compose, garantizando que el único punto de entrada expuesto al exterior sea el Proxy Inverso.

### Detalle de los Componentes:

1. **Capa de Entrada (Gateway / Proxy Inverso):** * **Tecnología:** `nginx:alpine`.
   * **Función:** Único servicio que expone puertos al host de la VM (`80:80`). Actúa como Reverse Proxy redirigiendo el tráfico web (`/`) al Frontend y las consultas lógicas (`/api/`) al clúster de Backend, actuando además como un balanceador de carga nativo mediante el DNS de Docker.
2. **Capa de Presentación (Frontend):**
   * **Tecnología:** Imagen optimizada basada en Alpine.
   * **Función:** Proporciona la interfaz gráfica de usuario para interactuar con el sistema validador.
3. **Capa de Lógica de Negocio (Backend):**
   * **Tecnología:** Go 1.22 (Framework Gin) montado sobre una imagen limpia de ejecución `alpine:latest`.
   * **Arquitectura de Software:** Implementa una arquitectura limpia en capas (`cmd`, `handler`, `service`, `repository`, `models`, `router`).
   * **Disponibilidad:** Configurado con **2 réplicas autónomas** que escalan horizontalmente de forma transparente.
4. **Capa de Datos (Base de Datos):**
   * **Tecnología:** `postgres:alpine`.
   * **Función:** Almacenamiento seguro del estado de los votantes.

---

## Características de Seguridad y Optimización 

* **Imágenes Minimalistas (Alpine):** Todos los componentes del sistema utilizan distribuciones basadas en Alpine Linux para reducir drásticamente el tamaño de las imágenes, mitigar vulnerabilidades comunes (CVEs) y optimizar los tiempos de despliegue.
* **Construcción Multi-Etapa (Multi-stage Build):** El Dockerfile de Go compila de forma estática el binario utilizando una imagen de desarrollo `golang:alpine` y posteriormente traslada únicamente el ejecutable final a un contenedor `alpine:latest` limpio, reduciendo el peso final en más de un 80%.
* **Aislamiento de Redes (Network Isolation):**
  * `network_sist` (Bridge): Conecta al Proxy, Frontend y las instancias de Backend.
  * `db_network` (Bridge): Conecta **exclusivamente** el Backend con la Base de Datos. La base de datos está completamente aislada del exterior y del Frontend, previniendo inyecciones o ataques directos.
* **Persistencia Real (Named Volumes):** Se utiliza un volumen nombrado administrado por Docker (`db_postgres_votos`) mapeado a `/var/lib/postgresql/data` para garantizar la persistencia de datos ante reinicios o destrucción de los contenedores (`docker compose down`).
---

## Despliegue del Sistema

El proyecto está configurado para producción y se inicializa mediante **un único comando**, cumpliendo con el requisito clave de la evaluación automatizada.

### Requisitos Previos
* Docker Desktop o Docker Engine instalado.
* Docker Compose V2 habilitado.

### Pasos para Desplegar (Local o Servidor VM)

1. Clonar el repositorio institucional:
   git clone <url-del-repositorio>
   cd sistema-validador-de-votos
2. Configurar las variables de entorno:
   cp .env .env
3. Levantar todo el ecosistema:
   docker compose up -d --build
4. Bajar el sistema:
   docker compose down


## Arquitectura del sistema

```mermaid
graph TD
    %% Cliente Externo
    Cliente([ Cliente / Navegador]) -->|Puerto 80| VM[ Máquina Virtual <br> 148.83.102.25]

    subgraph Docker_Engine [ Docker Engine]
        
        %% Proxy Inverso
        VM -->|Mapeo 80:80| Nginx[ Nginx Container]

        %% Red de Sistema (Frontend y Backend)
        subgraph network_sist [ network_sist - Red Bridge Aislada]
            Nginx -->|/ | Frontend[ Frontend Container <br> Next.js:3000]
            Nginx -->|/api/ <br> Balanceo de Carga| Backend1[ Backend Replica 1 <br> Go Gin:8080]
            Nginx -->|/api/ <br> Balanceo de Carga| Backend2[ Backend Replica 2 <br> Go Gin:8080]
        end

        %% Red de Base de Datos (Aislada del Frontend y Nginx)
        subgraph db_network [ db_network - Red Interna Segura]
            Backend1 -->|Puerto 5432| DB[( bd_elecciones <br> Postgres 15)]
            Backend2 -->|Puerto 5432| DB
        end

        %% Volumen de persistencia
        DB -->|Persistencia| Vol[( db_postgres <br> Volumen Docker)]
    end

    %% Estilos Visuales
    style VM fill:#f9f,stroke:#333,stroke-width:2px
    style Nginx fill:#bbf,stroke:#333,stroke-width:2px
    style Frontend fill:#bfb,stroke:#333,stroke-width:1px
    style Backend1 fill:#fbb,stroke:#333,stroke-width:1px
    style Backend2 fill:#fbb,stroke:#333,stroke-width:1px
    style DB fill:#ffb,stroke:#333,stroke-width:2px
    style Vol fill:#ddd,stroke:#333,stroke-dasharray: 5 5

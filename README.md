# 🚀 Portafolio Web Profesional — Edinson Caraballo

[![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Django](https://img.shields.io/badge/Django-5.0%2B-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

Este es un portafolio profesional interactivo de **alto impacto visual y diseño premium**, desarrollado específicamente para destacar la trayectoria y habilidades de **Edinson Caraballo**. 

La aplicación está diseñada con una arquitectura desacoplada utilizando **Angular** en el frontend, **Django REST Framework (DRF)** en el backend, y orquestada completamente mediante contenedores **Docker** y **Docker Compose** para asegurar un despliegue y desarrollo local inmediato y sin fricciones.

---

## 🎨 Características de Diseño
* **Rich Aesthetics**: Diseño moderno con efectos de desenfoque de fondo (*glassmorphism*), gradientes suaves, y orbes ambientales animados que reaccionan sutilmente.
* **Consola Interactiva**: Simulador de terminal integrado con un mini-juego de optimización SQL, simulando un entorno de hacking/análisis real y lluvia de código estilo Matrix.
* **Sistema de Temas Dinámicos**: Permite alternar colores de acento (Azul, Esmeralda, Violeta, Rosa) en tiempo real con persistencia visual.
* **Accesibilidad e Internacionalización**: Soporte nativo para modo de alta accesibilidad (alto contraste) y soporte multi-idioma (Español / Inglés).

---

## 🏗️ Arquitectura y Estructura del Proyecto

El proyecto está organizado en monorepositorio con la siguiente estructura principal:

```
MiPortafolio/
├── backend/                  # API REST construida con Django
│   ├── api/                  # Módulos y vistas principales de la API
│   ├── portfolio_backend/    # Configuración del servidor Django
│   ├── Dockerfile            # Configuración Docker para el entorno Python
│   └── requirements.txt      # Dependencias del Backend
│
├── frontend/                 # Aplicación SPA interactiva en Angular 17
│   ├── src/
│   │   ├── app/              # Componentes Angular (Standalone & Signals)
│   │   │   ├── services/     # Servicios de comunicación con API e idiomas
│   │   │   └── models/       # Modelos y tipado de datos TypeScript
│   │   └── assets/           # Archivos de traducción i18n e imágenes
│   ├── Dockerfile            # Configuración Docker para el entorno Node.js
│   └── package.json          # Dependencias y scripts del Frontend
│
├── docker-compose.yml        # Orquestación de contenedores
└── .gitignore                # Archivos excluidos del control de versiones
```

---

## ⚙️ Puertos de Ejecución
Para evitar conflictos con puertos estándar de otros proyectos locales, la aplicación ha sido configurada en puertos alternativos:
* **Frontend (Angular)**: `http://localhost:4210`
* **Backend API (Django)**: `http://localhost:8010`

---

## 🚀 Guía de Inicio Rápido con Docker

### Requisitos Previos
* Tener instalado **Docker** y **Docker Compose** en tu sistema.

### Despliegue Local
Abre una terminal en el directorio raíz del proyecto (`MiPortafolio`) y ejecuta:

```bash
# Detener contenedores previos (si los hay)
docker compose down

# Reconstruir y levantar servicios en segundo plano
docker compose up --build -d
```

Una vez completado el inicio de los servicios:
* Accede al **Frontend interactivo**: [http://localhost:4210](http://localhost:4210)
* Accede a la **API del Backend**: [http://localhost:8010/api/](http://localhost:8010/api/)

---

## 🌐 Endpoints de la API REST

El Backend expone los siguientes endpoints para el consumo dinámico de información:

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **GET** | `/api/portfolio/?lang=es` | Obtiene el perfil profesional completo de Edinson (Habilidades, Experiencia, Proyectos) en Español. |
| **GET** | `/api/portfolio/?lang=en` | Obtiene el mismo perfil en Inglés. |
| **POST** | `/api/contact/` | Procesa y valida el formulario de contacto interactivo del frontend. |

---

## 📦 Cómo Subir este Proyecto a Git (GitHub / GitLab)

Para publicar y almacenar este proyecto en tu repositorio personal de Git, sigue estos sencillos pasos desde la carpeta raíz del proyecto:

1. **Inicializar el repositorio Git local**:
   ```bash
   git init
   ```

2. **Añadir todos los archivos al área de preparación (staging)**:
   *El archivo `.gitignore` configurado automáticamente evitará que subas dependencias o credenciales locales.*
   ```bash
   git add .
   ```

3. **Crear tu primer Commit**:
   ```bash
   git commit -m "feat: setup inicial de portafolio profesional con docker, angular y django"
   ```

4. **Crear y renombrar la rama principal**:
   ```bash
   git branch -M main
   ```

5. **Enlazar tu repositorio local con el remoto**:
   *(Reemplaza la URL con la de tu repositorio creado en GitHub o GitLab)*
   ```bash
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   ```

6. **Subir tu proyecto**:
   ```bash
   git push -u origin main
   ```

# MediCloud
## Descripción

Este proyecto tiene como objetivo desarrollar una aplicación web para el registro de historias clínicas que cumpla con los aspectos legales específicos de Argentina. La aplicación está construida utilizando el stack MENTH (MongoDB, ExpressJS, NodeJS, TailwindCSS y Handlebars) y aprovecha el paquete `create-menth-app` para la configuración inicial y la autenticación mediante Passport.

## Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración](#configuración)
5. [Rutas y Endpoints](#rutas-y-endpoints)
6. [Tipos de Usuarios y Permisos](#tipos-de-usuarios-y-permisos)
7. [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
8. [Aspectos Legales](#aspectos-legales)
9. [Contribución](#contribución)
10. [Licencia](#licencia)

## Requisitos Previos

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (>= 4.x)

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/registro-historias-clinicas.git
    cd registro-historias-clinicas
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto. Utiliza el archivo `.env.example` como referencia:
    ```bash
    cp .env.example .env
    ```

4. Inicia el servidor:
    ```bash
    npm start
    ```

## Estructura del Proyecto

```bash
MediCloud/
├── .github/ # GitHub configuration files and workflows
├── src/
├── config/ # Configuration files and scripts
├── public/ # Static assets
│ │ ├── css/ # Stylesheets
│ │ ├── js/ # Scripts
│ │ ├── images/ # Images
│ │ ├── favicon.ico
│ ├── components/ # Handlebars components and partials
│ ├── controllers/ # Express route controllers
│ ├── middleware/ # Express middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # Express routes
│ ├── services/ # Business logic and services
│ ├── views/ # Handlebars templates
│ ├── server/ # Server-related files
│ │ ├── db/ # Database connection files
│ │ │ └── db_connection.js # MongoDB connection configuration
│ │ └── server.js # Entry point for the server
├── .env # Environment variables
├── .eslintignore # ESLint ignore file
├── .eslintrc.json # ESLint configuration
├── .gitignore # Git ignore file
├── package.json # Node.js dependencies and scripts
├── README.md # Project documentation
└── tailwind.config.js # TailwindCSS configuration
```

## Configuración

Asegúrate de configurar las variables de entorno en el archivo `.env`. Aquí hay un ejemplo de configuración:

\`\`\`
PORT=3000
MONGODB_URI=mongodb://localhost:27017/registro-historias-clinicas
SESSION_SECRET=tu_secreto_de_sesion
\`\`\`

## Rutas y Endpoints

### Rutas Públicas

- `GET /login`: Página de inicio de sesión.
- `POST /login`: Proceso de autenticación.

### Rutas Protegidas

Las rutas protegidas requieren autenticación y autorización adecuadas. Algunas de las funcionalidades clave incluyen:

- Acceso al panel principal.
- Gestión de historias clínicas.
- Acceso a la información del paciente.
- Funcionalidades administrativas.

### Rutas de Administración

Las rutas administrativas están disponibles solo para los administradores del sistema. Permiten la gestión de usuarios y configuraciones del sistema.

## Tipos de Usuarios y Permisos

- **Administrador del Sistema:** Gestión de usuarios y configuración general de la aplicación.
- **Médico:** Acceso y modificación de historias clínicas de sus pacientes.
- **Enfermero/a:** Acceso y modificación de registros médicos bajo la supervisión de un médico.
- **Paciente o Familiar de Paciente:** Acceso limitado a la historia clínica propia o de su familiar.

### Relaciones

- **Usuario - Rol:** Un usuario tiene un rol específico.
- **Paciente - Historia Clínica:** Un paciente puede tener múltiples historias clínicas.
- **Médico/Enfermero - Historia Clínica:** Una historia clínica puede ser modificada por un médico o un enfermero asignado.

## Aspectos Legales

Para cumplir con las normativas legales en Argentina, la aplicación debe considerar los siguientes puntos:

### Ley de Protección de Datos Personales (Ley 25.326)

- **Consentimiento Informado:** Los pacientes deben dar su consentimiento para el tratamiento de sus datos personales.
- **Derecho de Acceso y Rectificación:** Los pacientes tienen derecho a acceder y corregir sus datos.
- **Confidencialidad:** Los datos médicos deben ser tratados con estricta confidencialidad y solo accesibles por personal autorizado.

### Ley de Derechos del Paciente (Ley 26.529)

- **Historia Clínica Digital:** Las historias clínicas deben ser completas y accesibles solo por el personal médico autorizado y el propio paciente.
- **Conservación de Datos:** Las historias clínicas deben ser conservadas durante un período mínimo de 15 años.

## Contribución

Las contribuciones son bienvenidas. Para contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios.
4. Haz commit de tus cambios (`git commit -m 'Añadir nueva funcionalidad'`).
5. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
6. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.


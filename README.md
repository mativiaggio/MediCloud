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

\`\`\`
├── src
│   ├── config
│   │   └── passport.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── historiaClinicaController.js
│   │   ├── pacienteController.js
│   │   └── usuarioController.js
│   ├── models
│   │   ├── HistoriaClinica.js
│   │   ├── Paciente.js
│   │   └── Usuario.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── historiaClinicaRoutes.js
│   │   ├── pacienteRoutes.js
│   │   └── usuarioRoutes.js
│   ├── views
│   │   ├── layouts
│   │   │   └── main.hbs
│   │   ├── auth
│   │   │   └── login.hbs
│   │   ├── dashboard.hbs
│   │   └── historias
│   │       └── historia.hbs
│   ├── app.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
\`\`\`

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

- `GET /dashboard`: Panel principal para usuarios autenticados.
- `GET /historias`: Listado de historias clínicas.
- `POST /historias`: Crear una nueva historia clínica.
- `PUT /historias/:id`: Modificar una historia clínica existente.
- `GET /historias/:id`: Ver detalles de una historia clínica.
- `DELETE /historias/:id`: Eliminar una historia clínica.

### Rutas de Administración

- `GET /admin/usuarios`: Gestión de usuarios.
- `POST /admin/usuarios`: Crear un nuevo usuario.
- `PUT /admin/usuarios/:id`: Modificar un usuario existente.
- `DELETE /admin/usuarios/:id`: Eliminar un usuario.

## Tipos de Usuarios y Permisos

- **Administrador del Sistema:** Gestión de usuarios y configuración general de la aplicación.
- **Médico:** Acceso y modificación de historias clínicas de sus pacientes.
- **Enfermero/a:** Acceso y modificación de registros médicos bajo la supervisión de un médico.
- **Paciente o Familiar de Paciente:** Acceso limitado a la historia clínica propia o de su familiar.

## Estructura de la Base de Datos

### Colecciones

#### Usuarios

\`\`\`json
{
    "_id": ObjectId,
    "nombre": String,
    "apellido": String,
    "email": String,
    "password": String,
    "rol": String, // Administrador, Medico, Enfermero, Paciente, Familiar
    "fecha_creacion": Date,
    "activo": Boolean
}
\`\`\`

#### HistoriasClinicas

\`\`\`json
{
    "_id": ObjectId,
    "paciente_id": ObjectId,
    "medico_id": ObjectId,
    "enfermero_id": ObjectId,
    "fecha_creacion": Date,
    "fecha_modificacion": Date,
    "historia": [
        {
            "fecha": Date,
            "descripcion": String,
            "tratamiento": String,
            "observaciones": String
        }
    ]
}
\`\`\`

#### Pacientes

\`\`\`json
{
    "_id": ObjectId,
    "nombre": String,
    "apellido": String,
    "dni": String,
    "fecha_nacimiento": Date,
    "contacto": {
        "telefono": String,
        "email": String,
        "direccion": String
    },
    "historias_clinicas": [ObjectId] // Referencia a HistoriasClinicas
}
\`\`\`

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


# Aula Nexo - Plataforma Educativa

Aula Nexo es una plataforma educativa moderna diseñada para conectar a los estudiantes con cursos, recursos de aprendizaje y certificaciones. Este proyecto integra un frontend robusto y responsivo con una API backend escalable.

## 🚀 Tecnologías Utilizadas

### Frontend
- **Framework:** Angular 21 (Standalone Components)
- **Lenguaje:** TypeScript, HTML5, Vanilla CSS
- **Características:** 
  - Manejo de estado reactivo mediante `BehaviorSubject`.
  - Formularios reactivos (ReactiveForms).
  - Enrutamiento dinámico y lazy loading.
  - Diseño 100% responsivo y "mobile-first".

### Backend
- **Framework:** Spring Boot 3.4.1
- **Lenguaje:** Java 21
- **Base de Datos:** H2 Database (In-Memory) para fácil desarrollo.
- **Seguridad:** Spring Security (Encriptación de contraseñas con BCrypt).
- **ORM:** Spring Data JPA / Hibernate.

## 📂 Estructura del Proyecto

El repositorio está dividido en dos grandes módulos, cada uno independiente:

```text
Plataforma-Educativa/
├── Backend/                 # Proyecto API REST en Spring Boot
│   ├── src/main/java/...    # Controladores, Servicios, Seguridad y Modelos
│   └── pom.xml              # Configuración y dependencias de Maven
└── Frontend/                # Aplicación cliente web en Angular 21
    ├── src/
    │   ├── app/
    │   │   ├── features/    # Módulos principales (auth, profile, home, etc.)
    │   │   └── shared/      # Componentes reutilizables (navbar, alerts, etc.)
    │   └── styles.css       # Estilos globales y tokens CSS
    └── package.json         # Dependencias de NPM
```

## ✨ Funcionalidades Principales

*   **Autenticación de Usuarios:** Registro seguro de usuarios y encriptación de credenciales.
*   **Gestión de Sesiones:** Estado global que actualiza la UI al iniciar sesión (cambio de botones a menú desplegable con avatar de usuario).
*   **Perfil de Usuario:** 
    *   Dashboard personal que muestra los cursos en progreso con barras de progreso.
    *   Certificaciones ganadas por el usuario.
*   **Configuración de Cuenta (Account Settings):** Interfaz para modificar detalles personales y endpoint dedicado para cambio seguro de contraseña (validando la actual).
*   **Gestión de Errores Visual:** Respuestas a los formularios con avisos claros y validación de sintaxis en tiempo real.

## ⚙️ Cómo ejecutar el proyecto localmente

### 1. Iniciar el Backend (Spring Boot)
1. Asegúrate de tener **Java 21** instalado en tu sistema.
2. Abre tu IDE de preferencia (Eclipse, IntelliJ IDEA, o VS Code con Extension Pack for Java).
3. Importa la carpeta `Backend` como un proyecto Maven.
4. Ejecuta la clase principal `PlataformaApplication.java`.
5. El servidor se iniciará en `http://localhost:8080`.
> **Nota de Base de Datos:** La base de datos H2 se reconstruye cada vez que reinicias el backend. Puedes acceder a la consola gráfica de la base de datos navegando a `http://localhost:8080/h2-console` usando el usuario `sa` y contraseña vacía (JDBC URL: `jdbc:h2:mem:testdb`).

### 2. Iniciar el Frontend (Angular)
1. Asegúrate de tener **Node.js** instalado (se recomienda versión LTS).
2. Abre una terminal y navega a la carpeta de Angular:
   ```bash
   cd Frontend
   ```
3. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo local:
   ```bash
   npm start
   ```
5. Abre tu navegador y dirígete a `http://localhost:4200/`.

---

**Desarrollado para la asignatura Desarrollo Web Integrado.**

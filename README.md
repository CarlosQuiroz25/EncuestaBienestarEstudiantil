# 📊 Encuesta de Bienestar Estudiantil

¡Bienvenido al proyecto de Encuesta de Bienestar Estudiantil! Este sistema está diseñado para analizar y visualizar los resultados de encuestas realizadas a estudiantes, permitiendo entender mejor sus necesidades y experiencias para mejorar su calidad de vida.

## 📋 Descripción del Proyecto

Este proyecto consta de dos componentes principales:

1. **Aplicación de Análisis de Datos (Streamlit)** 📈 - Una herramienta interactiva para analizar y visualizar los resultados de las encuestas.
2. **Aplicación Web (React)** 💻 - Una interfaz moderna para que los estudiantes puedan completar las encuestas y los administradores gestionen el sistema.

## 🚀 Tecnologías Utilizadas

### Análisis de Datos (Carpeta Streamlit)
- **Streamlit**: Framework para crear aplicaciones de datos interactivas
- **Pandas & NumPy**: Análisis y manipulación de datos
- **Matplotlib & Plotly**: Visualización de datos

### Frontend (Carpeta frontend)
- **React 19**: Biblioteca para construir interfaces de usuario
- **Vite**: Herramienta de construcción rápida para aplicaciones web
- **React Router**: Navegación entre páginas
- **Tailwind CSS**: Framework CSS para diseño moderno y responsivo
- **Lucide React**: Iconos para la interfaz

## 🔧 Instalación y Configuración

### Requisitos Previos
- Python 3.8 o superior
- Node.js 18 o superior
- MySQL (para la base de datos)

### Configuración del Análisis de Datos (Streamlit)

1. **Navega a la carpeta Streamlit**:
   ```bash
   cd Streamlit
   ```

2. **Crea un entorno virtual** (recomendado):
   ```bash
   python -m venv .venv
   ```

3. **Activa el entorno virtual**:
   - En Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - En macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

4. **Instala las dependencias**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Ejecuta la aplicación**:
   ```bash
   streamlit run app.py
   ```

### Configuración del Frontend (React)

1. **Navega a la carpeta frontend**:
   ```bash
   cd frontend
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## 📱 Características Principales

### Dashboard de Análisis (Streamlit)
- **Página Principal**: Resumen general del proyecto y estadísticas clave
- **Análisis de Encuestas**: Resultados detallados y tendencias principales
- **Gráficos**: Visualizaciones interactivas y estadísticas comparativas

### Aplicación Web (React)
- **Interfaz Amigable**: Diseño moderno y fácil de usar
- **Sistema de Roles**: Diferentes vistas para estudiantes y administradores
- **Formularios Interactivos**: Encuestas dinámicas y fáciles de completar
- **Visualización de Resultados**: Acceso a estadísticas personalizadas

---

¡Gracias por usar nuestra aplicación de Encuesta de Bienestar Estudiantil! Esperamos que te sea útil para mejorar la experiencia de los estudiantes en tu institución. 🎓✨

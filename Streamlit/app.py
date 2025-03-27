import streamlit as st
from config import APP_CONFIG

# Configuración de la página
st.set_page_config(
    page_title=APP_CONFIG['title'],
    page_icon="📊",
    layout="wide"
)

# Título principal
st.title(APP_CONFIG['title'])
st.write(APP_CONFIG['description'])

# Sidebar
st.sidebar.title("Navegación")
page = st.sidebar.radio(
    "Selecciona una página:",
    ["Dashboard", "Análisis de Encuestas", "Estadísticas de Usuarios"]
)

# Contenido principal
if page == "Dashboard":
    st.header("Dashboard General")
    st.write("Bienvenido al dashboard de análisis de encuestas de bienestar estudiantil.")
    # Aquí se importarán y mostrarán los componentes del dashboard

elif page == "Análisis de Encuestas":
    st.header("Análisis Detallado de Encuestas")
    st.write("Análisis detallado de las respuestas a las encuestas.")
    # Aquí se importarán y mostrarán los componentes de análisis de encuestas

else:
    st.header("Estadísticas de Usuarios")
    st.write("Estadísticas y métricas relacionadas con los usuarios.")
    # Aquí se importarán y mostrarán los componentes de estadísticas de usuarios 
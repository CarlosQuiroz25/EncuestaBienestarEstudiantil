import streamlit as st

# Configuración de la página
st.set_page_config(
    page_title="Bienestar Estudiantil",  # Este es el título que aparecerá en la pestaña
    page_icon="📊",                          # Icono que aparecerá en la pestaña
    layout="wide",                           # Layout amplio para mejor visualización
    initial_sidebar_state="expanded"        # Sidebar expandido por defecto
   
)

def main_page():
    # Título principal con icono
    st.title("📊 Encuestas de Bienestar Estudiantil")
    
    # Descripción principal
    st.markdown("""
    ### ¡Bienvenido al Dashboard de Bienestar Estudiantil! 🎓

    Esta plataforma está diseñada para analizar y visualizar los resultados de las encuestas 
    realizadas a los estudiantes de nuestra institución, permitiéndonos entender mejor las necesidades y experiencias 
    de nuestra comunidad educativa para poder mejorar la calidad de vida de los estudiantes.

    ---
    
    #### 🔍 ¿Qué encontrarás aquí?
    
    * **Página Principal** 🏠
        * Resumen general del proyecto
        * Guía de navegación
        * Información actualizada
    
    * **Análisis de Encuestas** 📝
        * Resultados detallados
        * Tendencias principales
        * Filtros personalizados
    
    * **Gráficos** 📈
        * Visualizaciones interactivas
        * Estadísticas clave
        * Comparativas temporales
    
    ---
    
    #### 🚀 Cómo navegar:
    1. Utiliza el menú de navegación en la barra lateral izquierda
    2. Selecciona la sección que deseas explorar
    3. Interactúa con los gráficos y filtros disponibles
    
    > 💡 **Tip**: Puedes expandir los gráficos haciendo clic en el ícono de expansión 
    en la esquina superior derecha de cada visualización.
    """)
    
    # Información adicional en un expander
    with st.expander("ℹ️ Acerca de los datos"):
        st.write("""
        Los datos presentados en este dashboard provienen de encuestas realizadas 
        a estudiantes de nuestra institución. Todas las respuestas son anónimas 
        y se actualizan periódicamente para mantener la información relevante y actualizada.
        """)
    
    # Métricas importantes en la página principal
    st.subheader("📌 Resumen General")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric(label="Total de Encuestas", value="En desarrollo", delta="Próximamente")
    with col2:
        st.metric(label="Participación Estudiantil", value="En desarrollo", delta="Próximamente")
    with col3:
        st.metric(label="Índice de Satisfacción", value="En desarrollo", delta="Próximamente")
        
def analysis_page():
    st.title("Análisis de Encuestas 📝")
    st.write("Análisis detallado de las respuestas a las encuestas.")

def grafics_page():
    st.title("Gráficos 📈")
    st.write("Visualizaciones interactivas de los datos.")

st.sidebar.title("Navegación")
page = st.sidebar.radio('Selecciona una página', ['Página Principal', 'Análisis de Encuestas', 'Graficos'])

if page == 'Página Principal':
    main_page()
elif page == 'Análisis de Encuestas':
    analysis_page()
elif page == 'Graficos':
    grafics_page()

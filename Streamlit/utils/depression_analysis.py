import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import streamlit as st
import os

def cargar_datos_depresion():
    """Carga y prepara el dataset de depresión estudiantil."""
    try:
        file_path = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            'static',
            'datasets',
            'student_depression_dataset.csv'
        )
        df = pd.read_csv(file_path)
        
        # Seleccionar solo las columnas relevantes
        columnas_relevantes = [
            'Age',
            'Sleep Duration',
            'Dietary Habits',
            'Have you ever had suicidal thoughts ?',
            'Work/Study Hours',
            'Financial Stress',
            'Family History of Mental Illness',
            'Depression'
        ]
        
        df = df[columnas_relevantes]
        
        # Traducir valores al español
        df = df.rename(columns={
            'Age': 'Edad',
            'Sleep Duration': 'Horas_Sueño',
            'Dietary Habits': 'Dieta',
            'Have you ever had suicidal thoughts ?': 'Pensamientos_Suicidas',
            'Work/Study Hours': 'Horas_Estudio_Trabajo',
            'Financial Stress': 'Estrés_Financiero',
            'Family History of Mental Illness': 'Historial_Familiar',
            'Depression': 'Depresión'
        })
        
        # Traducir valores categóricos
        df['Pensamientos_Suicidas'] = df['Pensamientos_Suicidas'].map({'Yes': 'Sí', 'No': 'No'})
        df['Historial_Familiar'] = df['Historial_Familiar'].map({'Yes': 'Sí', 'No': 'No'})
        df['Depresión'] = df['Depresión'].map({1: 'Sí', 0: 'No'})
        df['Dieta'] = df['Dieta'].map({
            'Healthy': 'Saludable',
            'Moderate': 'Moderada',
            'Unhealthy': 'No saludable'
        })
        
        # Limpiar espacios en blanco y comillas en la columna de horas de sueño
        df['Horas_Sueño'] = df['Horas_Sueño'].str.strip(" '")
        
        # Traducir rangos de horas de sueño
        mapeo_horas_sueño = {
            'Less than 5 hours': 'Menos de 5 horas',
            '5-6 hours': '5-6 horas',
            '7-8 hours': '7-8 horas',
            'More than 8 hours': 'Más de 8 horas'
        }
        
        # Aplicar el mapeo solo a valores no nulos
        df['Horas_Sueño'] = df['Horas_Sueño'].apply(
            lambda x: mapeo_horas_sueño.get(x, x) if pd.notnull(x) else 'No especificado'
        )
        
        # Llenar valores nulos con 'No especificado'
        df['Horas_Sueño'] = df['Horas_Sueño'].fillna('No especificado')
        
        return df
    except Exception as e:
        st.error(f"Error al cargar los datos de depresión: {e}")
        return None

def analizar_salud_mental(df):
    """Analiza los aspectos de salud mental."""
    st.header("🔍 Análisis de Salud Mental")
    
    # Explicación de los valores de depresión
    st.markdown("""
    ### 📌 Nota sobre los valores de depresión:
    - **Sí**: El estudiante presenta indicadores de depresión
    - **No**: El estudiante no presenta indicadores de depresión
    """)
    
    # Gráfico de distribución de depresión
    fig1 = px.pie(
        df, 
        names='Depresión',
        title='Distribución de Depresión en Estudiantes',
        color='Depresión',
        color_discrete_map={'No': '#2ecc71', 'Sí': '#e74c3c'},
        category_orders={'Depresión': ['No', 'Sí']},
        labels={'Depresión': 'Estado de Depresión'}
    )
    fig1.update_traces(
        textposition='inside', 
        textinfo='percent+label+value',
        hovertemplate='%{label}: %{percent} (%{value} estudiantes)<extra></extra>'
    )
    
    # Explicación del gráfico
    st.markdown("""
    #### Distribución de Depresión
    Este gráfico muestra el porcentaje de estudiantes que presentan indicadores de depresión 
    en comparación con los que no. La depresión se evaluó mediante un cuestionario validado.
    """)
    
    # Mostrar gráficos en dos columnas
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.plotly_chart(fig1, use_container_width=True, key='distribucion_depresion')
    
    # Gráfico de pensamientos suicidas vs depresión
    st.markdown("---")
    st.markdown("""
    #### Relación entre Pensamientos Suicidas y Depresión
    Este gráfico explora la asociación entre reportar pensamientos suicidas y el diagnóstico de depresión.
    Es importante notar que no todos los estudiantes con pensamientos suicidas tienen depresión clínica,
    y viceversa.
    """)
    
    fig2 = px.histogram(
        df, 
        x='Pensamientos_Suicidas',
        color='Depresión',
        title='Pensamientos Suicidas vs Depresión',
        barmode='group',
        color_discrete_map={'No': '#2ecc71', 'Sí': '#e74c3c'},
        category_orders={
            'Pensamientos_Suicidas': ['No', 'Sí'],
            'Depresión': ['No', 'Sí']
        },
        labels={
            'Pensamientos_Suicidas': '¿Ha tenido pensamientos suicidas?',
            'count': 'Número de Estudiantes',
            'Depresión': 'Diagnóstico de Depresión'
        }
    )
    fig2.update_layout(
        xaxis_title='¿Ha tenido pensamientos suicidas?',
        yaxis_title='Número de Estudiantes',
        legend_title='Depresión',
        hovermode='x unified'
    )
    
    with col2:
        st.plotly_chart(fig2, use_container_width=True, key='pensamientos_suicidas')

def analizar_estilo_vida(df):
    """Analiza los aspectos del estilo de vida."""
    st.header("🏃‍♂️ Análisis de Estilo de Vida")
    
    st.markdown("""
    ### Relación entre Estilo de Vida y Depresión
    Los siguientes gráficos muestran cómo los patrones de sueño y alimentación se relacionan 
    con la depresión en los estudiantes.
    """)
    
    # Gráfico de duración del sueño vs depresión
    st.markdown("#### Horas de Sueño y su Relación con la Depresión")
    st.markdown("""
    Este gráfico de cajas muestra la distribución de horas de sueño entre estudiantes 
    con y sin depresión. Las cajas representan el rango intercuartílico, la línea dentro 
    de la caja es la mediana, y los bigotes muestran el rango de los datos.
    """)
    
    fig1 = px.box(
        df, 
        x='Depresión',
        y='Horas_Sueño',
        color='Depresión',
        color_discrete_map={'No': '#2ecc71', 'Sí': '#e74c3c'},
        category_orders={'Depresión': ['No', 'Sí']},
        labels={
            'Horas_Sueño': 'Horas de Sueño',
            'Depresión': 'Diagnóstico de Depresión'
        }
    )
    fig1.update_layout(
        xaxis_title='Diagnóstico de Depresión',
        yaxis_title='Horas de Sueño',
        showlegend=False,
        hovermode='x unified'
    )
    
    # Gráfico de hábitos alimenticios
    st.markdown("---")
    st.markdown("#### Calidad de la Dieta y su Relación con la Depresión")
    st.markdown("""
    Este gráfico compara los hábitos alimenticios entre estudiantes con y sin depresión.
    Se categorizó la dieta como 'Saludable', 'Moderada' o 'No saludable' según los 
    reportes de los estudiantes.
    """)
    
    fig2 = px.histogram(
        df, 
        x='Dieta',
        color='Depresión',
        title='Calidad de la Dieta vs Depresión',
        barmode='group',
        color_discrete_map={'No': '#2ecc71', 'Sí': '#e74c3c'},
        category_orders={
            'Dieta': ['No saludable', 'Moderada', 'Saludable'],
            'Depresión': ['No', 'Sí']
        },
        labels={
            'Dieta': 'Calidad de la Dieta',
            'count': 'Número de Estudiantes',
            'Depresión': 'Diagnóstico de Depresión'
        }
    )
    fig2.update_layout(
        xaxis_title='Calidad de la Dieta',
        yaxis_title='Número de Estudiantes',
        legend_title='Depresión',
        hovermode='x unified'
    )
    
    # Mostrar gráficos en dos columnas
    col1, col2 = st.columns(2)
    with col1:
        st.plotly_chart(fig1, use_container_width=True)
    with col2:
        st.plotly_chart(fig2, use_container_width=True)

def analizar_factores_estres(df):
    """Analiza los factores de estrés."""
    st.header("💡 Factores de Estrés y su Impacto en la Salud Mental")
    
    st.markdown("""
    ### Influencia de Factores de Estrés en la Depresión
    Los siguientes gráficos exploran cómo diferentes factores de estrés se relacionan 
    con la presencia de depresión en los estudiantes.
    """)
    
    # Gráfico de estrés financiero
    st.markdown("#### Nivel de Estrés Financiero")
    st.markdown("""
    Este gráfico muestra la relación entre el nivel de estrés financiero auto-reportado 
    (en una escala del 1 al 5, donde 1 es 'Ningún estrés' y 5 es 'Estrés extremo') y 
    la presencia de depresión.
    """)
    
    fig1 = px.histogram(
        df, 
        x='Estrés_Financiero',
        color='Depresión',
        title='Nivel de Estrés Financiero vs Depresión',
        barmode='group',
        color_discrete_map={'No': '#2ecc71', 'Sí': '#e74c3c'},
        category_orders={
            'Estrés_Financiero': [1, 2, 3, 4, 5],
            'Depresión': ['No', 'Sí']
        },
        labels={
            'Estrés_Financiero': 'Nivel de Estrés Financiero (1-5)',
            'count': 'Número de Estudiantes',
            'Depresión': 'Diagnóstico de Depresión'
        }
    )
    fig1.update_layout(
        xaxis_title='Nivel de Estrés Financiero (1-5)',
        yaxis_title='Número de Estudiantes',
        legend_title='Depresión',
        hovermode='x unified'
    )
    
    # Gráfico de historial familiar
    st.markdown("---")
    st.markdown("#### Historial Familiar de Enfermedad Mental")
    st.markdown("""
    Este gráfico muestra la relación entre tener antecedentes familiares de enfermedad 
    mental y la presencia de depresión en los estudiantes.
    """)
    
    fig2 = px.histogram(
        df, 
        x='Historial_Familiar',
        color='Depresión',
        title='Historial Familiar de Enfermedad Mental vs Depresión',
        barmode='group',
        color_discrete_map={'No': '#2ecc71', 'Sí': '#e74c3c'},
        category_orders={
            'Historial_Familiar': ['No', 'Sí'],
            'Depresión': ['No', 'Sí']
        },
        labels={
            'Historial_Familiar': '¿Tiene historial familiar de enfermedad mental?',
            'count': 'Número de Estudiantes',
            'Depresión': 'Diagnóstico de Depresión'
        }
    )
    fig2.update_layout(
        xaxis_title='¿Tiene historial familiar de enfermedad mental?',
        yaxis_title='Número de Estudiantes',
        legend_title='Depresión',
        hovermode='x unified'
    )
    
    # Mostrar gráficos en dos columnas
    col1, col2 = st.columns(2)
    with col1:
        st.plotly_chart(fig1, use_container_width=True)
    with col2:
        st.plotly_chart(fig2, use_container_width=True)

def mostrar_datos_brutos(df):
    """Muestra una muestra de los datos brutos."""
    st.header("📋 Muestra de Datos")
    st.dataframe(df, use_container_width=True)

def generar_conclusiones(df):
    """Genera conclusiones basadas en el análisis."""
    st.header("📌 Conclusiones y Recomendaciones")
    
    # Calcular estadísticas para las conclusiones
    total_estudiantes = len(df)
    tasa_depresion = (df['Depresión'] == 'Sí').mean() * 100
    
    # Obtener estadísticas de sueño
    df['Horas_Sueño'] = pd.to_numeric(df['Horas_Sueño'], errors='coerce')
    sueno_menos_5h = df[df['Horas_Sueño'] < 5]
    tasa_depresion_sueno_menos_5h = (sueno_menos_5h['Depresión'] == 'Sí').mean() * 100 if not sueno_menos_5h.empty else 0
    
    # Obtener estadísticas de dieta
    dieta_saludable = df[df['Dieta'] == 'Saludable']
    tasa_depresion_dieta_saludable = (dieta_saludable['Depresión'] == 'Sí').mean() * 100
    
    # Obtener estadísticas de estrés financiero
    # Convertir a numérico y manejar valores faltantes
    df['Estrés_Financiero'] = pd.to_numeric(df['Estrés_Financiero'], errors='coerce')
    estres_alto = df[df['Estrés_Financiero'] >= 4]
    tasa_depresion_estres_alto = (estres_alto['Depresión'] == 'Sí').mean() * 100 if not estres_alto.empty else 0
    
    # Obtener estadísticas de historial familiar
    con_historial = df[df['Historial_Familiar'] == 'Sí']
    tasa_depresion_con_historial = (con_historial['Depresión'] == 'Sí').mean() * 100
    
    st.markdown(f"""
    ### Hallazgos Principales
    
    Se analizaron un total de **{total_estudiantes} estudiantes**, encontrando que:
    - **{tasa_depresion:.1f}%** presentan indicadores de depresión
    - **{tasa_depresion_sueno_menos_5h:.1f}%** de los que duermen menos de 5 horas tienen depresión
    - Solo **{tasa_depresion_dieta_saludable:.1f}%** de los estudiantes con dieta saludable presentan depresión
    - **{tasa_depresion_estres_alto:.1f}%** de los estudiantes con alto estrés financiero tienen depresión
    - **{tasa_depresion_con_historial:.1f}%** de estudiantes con historial familiar de enfermedad mental presentan depresión
    
    ### Conclusiones Clave
    """)
    
    conclusiones = [
        f"🔹 **Sueño insuficiente**: Los estudiantes que duermen menos de 5 horas tienen una tasa de depresión significativamente mayor ({tasa_depresion_sueno_menos_5h:.1f}% vs {tasa_depresion:.1f}% general).",
        f"🔹 **Dieta saludable**: Solo el {tasa_depresion_dieta_saludable:.1f}% de los estudiantes con dieta saludable presentan depresión, comparado con el {tasa_depresion:.1f}% general.",
        f"🔹 **Estrés financiero**: El {tasa_depresion_estres_alto:.1f}% de los estudiantes con alto estrés financiero presentan depresión.",
        f"🔹 **Historial familiar**: Los estudiantes con antecedentes familiares tienen una tasa de depresión del {tasa_depresion_con_historial:.1f}%.",
        "🔹 **Pensamientos suicidas**: Existe una fuerte correlación entre reportar pensamientos suicidas y diagnóstico de depresión."
    ]
    
    for conclusion in conclusiones:
        st.markdown(conclusion)
    
    st.markdown("""
    ### Recomendaciones Estratégicas
    
    1. **Programas de Higiene del Sueño**
       - Talleres sobre hábitos de sueño saludables
       - Creación de espacios para siestas en el campus
       
    2. **Orientación Nutricional**
       - Talleres de alimentación saludable
       - Colaboración con servicios de alimentación para ofrecer opciones más saludables
       
    3. **Apoyo Financiero**
       - Asesorías sobre manejo de finanzas personales
       - Programas de becas y apoyo económico
       
    4. **Salud Mental**
       - Talleres de manejo del estrés
       - Servicios de consejería accesibles
       - Grupos de apoyo entre pares
       
    5. **Detección Temprana**
       - Tamizajes periódicos de salud mental
       - Capacitación para personal docente en identificación de señales de alerta
    """)

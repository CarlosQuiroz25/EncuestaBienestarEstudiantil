import streamlit as st
import pandas as pd
import plotly.express as px
from utils.db_connection import get_db_connection
from data.queries import get_survey_responses
from utils.data_processing import process_survey_data

def show_survey_analysis():
    st.title("Análisis Detallado de Encuestas")
    
    # Obtener datos
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        
        # Selector de encuesta
        cursor.execute("SELECT id, title FROM surveys")
        surveys = cursor.fetchall()
        survey_options = {f"{survey[1]} (ID: {survey[0]})": survey[0] for survey in surveys}
        selected_survey = st.selectbox("Selecciona una encuesta:", list(survey_options.keys()))
        
        if selected_survey:
            survey_id = survey_options[selected_survey]
            responses = get_survey_responses(cursor, survey_id)
            
            if responses:
                # Convertir a DataFrame
                df = pd.DataFrame(responses)
                
                # Análisis por pregunta
                st.subheader("Análisis por Pregunta")
                for question in df['question_text'].unique():
                    question_data = df[df['question_text'] == question]
                    
                    st.write(f"### {question}")
                    
                    # Estadísticas básicas
                    col1, col2, col3 = st.columns(3)
                    with col1:
                        st.metric("Promedio", f"{question_data['score'].mean():.2f}")
                    with col2:
                        st.metric("Desviación Estándar", f"{question_data['score'].std():.2f}")
                    with col3:
                        st.metric("Total Respuestas", len(question_data))
                    
                    # Gráfico de distribución
                    fig = px.histogram(question_data, x='score', nbins=10,
                                    title=f"Distribución de Respuestas: {question}")
                    st.plotly_chart(fig)
                    
                    # Tabla de respuestas
                    st.write("Respuestas detalladas:")
                    st.dataframe(question_data[['user_name', 'score']])
            else:
                st.warning("No hay respuestas para esta encuesta")
        
        conn.close()
    else:
        st.error("No se pudo conectar a la base de datos") 
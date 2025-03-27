import streamlit as st
import pandas as pd
import plotly.express as px
from utils.db_connection import get_db_connection
from data.queries import get_answers, get_questions, get_surveys, get_users
from utils.data_processing import process_survey_data, calculate_survey_statistics

def show_dashboard():
    st.title("Dashboard General")
    
    # Obtener datos
    conn = get_db_connection()
    if conn:
        cursor = conn.cursor()
        answers = get_answers(cursor)
        questions = get_questions(cursor)
        surveys = get_surveys(cursor)
        users = get_users(cursor)
        conn.close()
        
        # Procesar datos
        df = process_survey_data(answers, questions, surveys, users)
        stats = calculate_survey_statistics(df)
        
        # Mostrar métricas principales
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Respuestas", stats['total_responses'])
        with col2:
            st.metric("Usuarios Únicos", stats['unique_users'])
        with col3:
            st.metric("Puntuación Promedio", f"{stats['average_score']:.2f}")
        with col4:
            st.metric("Desviación Estándar", f"{stats['std_score']:.2f}")
        
        # Gráficos
        st.subheader("Distribución de Puntuaciones")
        fig = px.histogram(df, x='score', nbins=20)
        st.plotly_chart(fig)
        
        # Análisis por pregunta
        st.subheader("Análisis por Pregunta")
        question_stats = df.groupby('question_text')['score'].agg(['mean', 'count']).reset_index()
        fig = px.bar(question_stats, x='question_text', y='mean', title='Puntuación Promedio por Pregunta')
        st.plotly_chart(fig)
    else:
        st.error("No se pudo conectar a la base de datos") 
import streamlit as st
import pandas as pd
import plotly.express as px
from utils.db_connection import get_db_connection
from data.queries import get_answers, get_questions, get_surveys, get_users
from utils.data_processing import process_survey_data

def show_user_statistics():
    st.title("Estadísticas de Usuarios")
    
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
        
        # Estadísticas por usuario
        user_stats = df.groupby('user_id').agg({
            'score': ['mean', 'std', 'count'],
            'name': 'first'
        }).reset_index()
        
        user_stats.columns = ['user_id', 'name', 'mean_score', 'std_score', 'total_responses']
        
        # Mostrar métricas generales
        st.subheader("Métricas Generales")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Usuarios", len(user_stats))
        with col2:
            st.metric("Promedio de Respuestas por Usuario", f"{user_stats['total_responses'].mean():.1f}")
        with col3:
            st.metric("Promedio de Puntuación", f"{user_stats['mean_score'].mean():.2f}")
        
        # Gráfico de distribución de puntuaciones por usuario
        st.subheader("Distribución de Puntuaciones por Usuario")
        fig = px.box(df, x='name', y='score', title='Distribución de Puntuaciones por Usuario')
        st.plotly_chart(fig)
        
        # Tabla de estadísticas por usuario
        st.subheader("Estadísticas Detalladas por Usuario")
        st.dataframe(user_stats.sort_values('mean_score', ascending=False))
        
        # Análisis de participación
        st.subheader("Análisis de Participación")
        participation_data = df.groupby('name').size().reset_index(name='total_responses')
        fig = px.bar(participation_data, x='name', y='total_responses',
                    title='Número de Respuestas por Usuario')
        st.plotly_chart(fig)
    else:
        st.error("No se pudo conectar a la base de datos") 
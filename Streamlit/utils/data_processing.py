import pandas as pd
import numpy as np

def process_survey_data(answers, questions, surveys, users):
    """Procesa los datos de las encuestas y los convierte en un DataFrame."""
    # Convertir los resultados en DataFrames
    df_answers = pd.DataFrame(answers)
    df_questions = pd.DataFrame(questions)
    df_surveys = pd.DataFrame(surveys)
    df_users = pd.DataFrame(users)
    
    # Combinar los datos
    df_merged = df_answers.merge(df_questions, on='question_id', how='left')
    df_merged = df_merged.merge(df_surveys, on='survey_id', how='left')
    df_merged = df_merged.merge(df_users, on='user_id', how='left')
    
    return df_merged

def calculate_survey_statistics(df):
    """Calcula estadísticas básicas de las encuestas."""
    stats = {
        'total_responses': len(df),
        'unique_users': df['user_id'].nunique(),
        'average_score': df['score'].mean(),
        'std_score': df['score'].std()
    }
    return stats

def get_question_analysis(df):
    """Analiza las respuestas por pregunta."""
    question_stats = df.groupby('question_text').agg({
        'score': ['mean', 'std', 'count']
    }).reset_index()
    
    question_stats.columns = ['question', 'mean_score', 'std_score', 'response_count']
    return question_stats 
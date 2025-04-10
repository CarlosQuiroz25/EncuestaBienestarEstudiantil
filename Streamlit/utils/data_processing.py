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


def get_answers(cursor):
    """Obtiene todas las respuestas de las encuestas."""
    cursor.execute("SELECT * FROM answers;")
    return cursor.fetchall()

def get_questions(cursor):
    """Obtiene todas las preguntas de las encuestas."""
    cursor.execute("SELECT * FROM questions;")
    return cursor.fetchall()

def get_surveys(cursor):
    """Obtiene todas las encuestas."""
    cursor.execute("SELECT * FROM surveys;")
    return cursor.fetchall()

def get_users(cursor):
    """Obtiene todos los usuarios."""
    cursor.execute("SELECT * FROM users;")
    return cursor.fetchall()

def get_survey_responses(cursor, survey_id):
    """Obtiene las respuestas para una encuesta específica."""
    cursor.execute("""
        SELECT a.*, q.question_text, u.name as user_name
        FROM answers a
        JOIN questions q ON a.question_id = q.id
        JOIN users u ON a.user_id = u.id
        WHERE a.survey_id = %s;
    """, (survey_id,))
    return cursor.fetchall() 
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


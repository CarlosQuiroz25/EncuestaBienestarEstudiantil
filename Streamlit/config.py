import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configuración de la base de datos
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

# Configuración de la aplicación
APP_CONFIG = {
    'title': 'Análisis de Encuestas de Bienestar Estudiantil',
    'description': 'Dashboard para análisis de respuestas de encuestas de bienestar estudiantil'
} 
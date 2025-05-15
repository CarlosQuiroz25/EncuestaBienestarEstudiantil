import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import os

# Configuración para visualizaciones
plt.style.use('ggplot')
sns.set_theme(style="whitegrid")

# Rutas de los archivos
DATASETS_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'static', 'datasets')

def cargar_datos():
    """Carga los datos de los archivos CSV y los devuelve como DataFrames.
    Solo carga las columnas específicas."""
    try:
        # Cargar los archivos CSV con columnas específicas
        encuestas_df = pd.read_csv(
            os.path.join(DATASETS_PATH, 'Encuestas.csv'), 
            sep=';',
            usecols=['id', 'descripcion', 'titulo']  # Añadimos 'titulo' para mostrar nombres en selectbox
        )
        
        preguntas_df = pd.read_csv(
            os.path.join(DATASETS_PATH, 'Preguntas.csv'), 
            sep=';',
            usecols=['id', 'pregunta', 'survey_id', 'tipo_pregunta', 'opciones_respuesta']  # Necesitamos tipo_pregunta y opciones para análisis
        )
        
        respuestas_df = pd.read_csv(
            os.path.join(DATASETS_PATH, 'Respuestas.csv'), 
            sep=';',
            usecols=['id', 'respuesta', 'question_id']
        )
        
        return encuestas_df, preguntas_df, respuestas_df
    except Exception as e:
        st.error(f"Error al cargar los datos: {e}")
        return None, None, None

def obtener_estadisticas_basicas(encuestas_df, preguntas_df, respuestas_df):
    """Obtiene estadísticas básicas de los datos."""
    estadisticas = {
        'total_encuestas': len(encuestas_df),
        'total_preguntas': len(preguntas_df),
        'total_respuestas': len(respuestas_df)
    }
    return estadisticas

def analizar_demograficos(respuestas_df, preguntas_df):
    """Analiza los datos demográficos de los estudiantes."""
    # Identificar preguntas demográficas (edad, género, programa)
    preguntas_demograficas = preguntas_df[preguntas_df['survey_id'] == 1]
    
    resultados = {}
    
    # Análisis por edad
    if not preguntas_demograficas.empty:
        pregunta_edad_id = preguntas_demograficas[preguntas_demograficas['pregunta'].str.contains('edad', case=False, na=False)]['id'].values
        if len(pregunta_edad_id) > 0:
            edad_id = pregunta_edad_id[0]
            edades = respuestas_df[respuestas_df['question_id'] == edad_id]['respuesta']
            edades = pd.to_numeric(edades, errors='coerce')
            resultados['edad'] = {
                'promedio': edades.mean() if not edades.empty else 0,
                'mediana': edades.median() if not edades.empty else 0,
                'min': edades.min() if not edades.empty else 0,
                'max': edades.max() if not edades.empty else 0,
                'distribucion': edades.value_counts().sort_index().to_dict() if not edades.empty else {}
            }
        
        # Análisis por género
        pregunta_genero_id = preguntas_demograficas[preguntas_demograficas['pregunta'].str.contains('género', case=False, na=False)]['id'].values
        if len(pregunta_genero_id) > 0:
            genero_id = pregunta_genero_id[0]
            generos = respuestas_df[respuestas_df['question_id'] == genero_id]['respuesta']
            resultados['genero'] = generos.value_counts().to_dict() if not generos.empty else {}
        
        # Análisis por programa académico
        pregunta_programa_id = preguntas_demograficas[preguntas_demograficas['pregunta'].str.contains('programa', case=False, na=False)]['id'].values
        if len(pregunta_programa_id) > 0:
            programa_id = pregunta_programa_id[0]
            programas = respuestas_df[respuestas_df['question_id'] == programa_id]['respuesta']
            resultados['programa'] = programas.value_counts().to_dict() if not programas.empty else {}
    
    return resultados

def analizar_salud_fisica(respuestas_df, preguntas_df):
    """Analiza los datos de salud física de los estudiantes."""
    # Identificar preguntas de salud física (survey_id = 2)
    preguntas_salud = preguntas_df[preguntas_df['survey_id'] == 2]
    
    resultados = {}
    
    if not preguntas_salud.empty:
        for _, pregunta in preguntas_salud.iterrows():
            pregunta_id = pregunta['id']
            pregunta_texto = pregunta['pregunta']
            tipo_pregunta = pregunta['tipo_pregunta']
            
            respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_id]['respuesta']
            
            if tipo_pregunta == 'MULTIPLE_CHOICE':
                resultados[pregunta_texto] = respuestas_pregunta.value_counts().to_dict()
            elif tipo_pregunta == 'TEXT':
                # Para preguntas de texto, podemos contar palabras frecuentes
                palabras = ' '.join(respuestas_pregunta).lower().split()
                palabras_count = pd.Series(palabras).value_counts().head(10).to_dict()
                resultados[pregunta_texto] = palabras_count
    
    return resultados

def analizar_salud_mental(respuestas_df, preguntas_df):
    """Analiza los datos de salud mental de los estudiantes."""
    # Identificar preguntas de salud mental (survey_id = 3)
    preguntas_mental = preguntas_df[preguntas_df['survey_id'] == 3]
    
    resultados = {}
    
    if not preguntas_mental.empty:
        for _, pregunta in preguntas_mental.iterrows():
            pregunta_id = pregunta['id']
            pregunta_texto = pregunta['pregunta']
            
            respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_id]['respuesta']
            resultados[pregunta_texto] = respuestas_pregunta.value_counts().to_dict()
    
    return resultados

def analizar_habitos_estudio(respuestas_df, preguntas_df):
    """Analiza los datos de hábitos de estudio de los estudiantes."""
    # Identificar preguntas de hábitos de estudio (survey_id = 4)
    preguntas_habitos = preguntas_df[preguntas_df['survey_id'] == 4]
    
    resultados = {}
    
    if not preguntas_habitos.empty:
        for _, pregunta in preguntas_habitos.iterrows():
            pregunta_id = pregunta['id']
            pregunta_texto = pregunta['pregunta']
            tipo_pregunta = pregunta['tipo_pregunta']
            
            respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_id]['respuesta']
            
            if tipo_pregunta == 'MULTIPLE_CHOICE':
                resultados[pregunta_texto] = respuestas_pregunta.value_counts().to_dict()
            elif tipo_pregunta == 'TEXT':
                # Para preguntas de texto, podemos contar palabras frecuentes
                palabras = ' '.join(respuestas_pregunta).lower().split()
                palabras_count = pd.Series(palabras).value_counts().head(10).to_dict()
                resultados[pregunta_texto] = palabras_count
    
    return resultados

def analizar_vida_social(respuestas_df, preguntas_df):
    """Analiza los datos de vida social de los estudiantes."""
    # Identificar preguntas de vida social (survey_id = 5)
    preguntas_social = preguntas_df[preguntas_df['survey_id'] == 5]
    
    resultados = {}
    
    if not preguntas_social.empty:
        for _, pregunta in preguntas_social.iterrows():
            pregunta_id = pregunta['id']
            pregunta_texto = pregunta['pregunta']
            
            respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_id]['respuesta']
            resultados[pregunta_texto] = respuestas_pregunta.value_counts().to_dict()
    
    return resultados

def crear_grafico_barras(datos, titulo, eje_x, eje_y):
    """Crea un gráfico de barras interactivo con Plotly."""
    fig = px.bar(
        x=list(datos.keys()), 
        y=list(datos.values()),
        labels={'x': eje_x, 'y': eje_y},
        title=titulo,
        color=list(datos.keys()),
        color_discrete_sequence=px.colors.qualitative.Pastel
    )
    fig.update_layout(
        title_font_size=20,
        xaxis_title_font_size=16,
        yaxis_title_font_size=16,
        legend_title_font_size=16,
        height=500
    )
    return fig

def crear_grafico_pie(datos, titulo):
    """Crea un gráfico de pastel interactivo con Plotly."""
    fig = px.pie(
        values=list(datos.values()),
        names=list(datos.keys()),
        title=titulo,
        color_discrete_sequence=px.colors.qualitative.Pastel
    )
    fig.update_layout(
        title_font_size=20,
        legend_title_font_size=16,
        height=500
    )
    return fig

def crear_grafico_linea(datos, titulo, eje_x, eje_y):
    """Crea un gráfico de línea interactivo con Plotly."""
    fig = px.line(
        x=list(datos.keys()), 
        y=list(datos.values()),
        labels={'x': eje_x, 'y': eje_y},
        title=titulo,
        markers=True
    )
    fig.update_layout(
        title_font_size=20,
        xaxis_title_font_size=16,
        yaxis_title_font_size=16,
        height=500
    )
    return fig

def crear_histograma(datos, titulo, eje_x):
    """Crea un histograma interactivo con Plotly."""
    # Convertir datos a lista plana si es necesario
    if isinstance(datos, dict):
        # Si es un diccionario, expandir cada clave según su valor
        datos_expandidos = []
        for k, v in datos.items():
            # Convertir a entero si es posible
            try:
                k_num = float(k)
                datos_expandidos.extend([k_num] * int(v))
            except (ValueError, TypeError):
                # Si no se puede convertir, usar el valor como string
                datos_expandidos.extend([str(k)] * int(v))
        datos = datos_expandidos
    
    fig = px.histogram(
        x=datos,
        title=titulo,
        labels={'x': eje_x, 'y': 'Frecuencia'},
        color_discrete_sequence=['#636EFA']
    )
    fig.update_layout(
        title_font_size=20,
        xaxis_title_font_size=16,
        yaxis_title_font_size=16,
        height=500
    )
    return fig

def crear_mapa_calor(df_correlacion, titulo):
    """Crea un mapa de calor interactivo con Plotly."""
    fig = px.imshow(
        df_correlacion,
        text_auto=True,
        aspect="auto",
        color_continuous_scale='RdBu_r',
        title=titulo
    )
    fig.update_layout(
        title_font_size=20,
        height=600
    )
    return fig

def buscar_correlaciones(respuestas_df, preguntas_df):
    """Busca correlaciones entre diferentes respuestas."""
    # Crear un DataFrame pivotado para análisis de correlación
    # Solo para preguntas de opción múltiple que puedan tener correlación
    preguntas_multiple = preguntas_df[preguntas_df['tipo_pregunta'] == 'MULTIPLE_CHOICE']
    
    if preguntas_multiple.empty:
        return None
    
    # Crear un DataFrame para el análisis de correlación
    datos_correlacion = {}
    
    for _, pregunta in preguntas_multiple.iterrows():
        pregunta_id = pregunta['id']
        pregunta_texto = pregunta['pregunta']
        
        # Obtener respuestas para esta pregunta
        respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_id]
        
        # Mapear respuestas a valores numéricos para correlación
        if not respuestas_pregunta.empty:
            opciones = pregunta['opciones_respuesta']
            if isinstance(opciones, str) and opciones:
                opciones_lista = opciones.split(',')
                mapeo = {opcion: i for i, opcion in enumerate(opciones_lista)}
                
                # Mapear respuestas a valores numéricos
                for _, respuesta in respuestas_pregunta.iterrows():
                    user_id = respuesta['user_id']
                    valor_respuesta = respuesta['respuesta']
                    
                    # Asignar valor numérico si es posible
                    valor_numerico = mapeo.get(valor_respuesta, None)
                    if valor_numerico is not None:
                        if user_id not in datos_correlacion:
                            datos_correlacion[user_id] = {}
                        datos_correlacion[user_id][pregunta_texto] = valor_numerico
    
    # Convertir a DataFrame
    if datos_correlacion:
        df_correlacion = pd.DataFrame.from_dict(datos_correlacion, orient='index')
        # Calcular matriz de correlación
        matriz_correlacion = df_correlacion.corr()
        return matriz_correlacion
    
    return None

def identificar_patrones(respuestas_df, preguntas_df):
    """Identifica patrones y tendencias en las respuestas."""
    patrones = {}
    
    # Identificar preguntas con respuestas más homogéneas (menor variabilidad)
    homogeneidad = {}
    
    for _, pregunta in preguntas_df.iterrows():
        pregunta_id = pregunta['id']
        pregunta_texto = pregunta['pregunta']
        tipo_pregunta = pregunta['tipo_pregunta']
        
        if tipo_pregunta == 'MULTIPLE_CHOICE':
            respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_id]['respuesta']
            
            if not respuestas_pregunta.empty:
                # Calcular la concentración de respuestas (cuánto % representa la respuesta más común)
                total_respuestas = len(respuestas_pregunta)
                respuesta_mas_comun = respuestas_pregunta.value_counts().iloc[0]
                concentracion = respuesta_mas_comun / total_respuestas
                
                homogeneidad[pregunta_texto] = {
                    'concentracion': concentracion,
                    'respuesta_comun': respuestas_pregunta.value_counts().index[0],
                    'porcentaje': concentracion * 100
                }
    
    # Ordenar por concentración (mayor homogeneidad primero)
    homogeneidad_ordenada = {k: v for k, v in sorted(homogeneidad.items(), key=lambda item: item[1]['concentracion'], reverse=True)}
    patrones['homogeneidad'] = homogeneidad_ordenada
    
    return patrones

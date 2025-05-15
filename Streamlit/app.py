import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import os
from utils.data_analysis import *

# Configuración de la página
st.set_page_config(
    page_title="Bienestar Estudiantil",  # Este es el título que aparecerá en la pestaña
    page_icon="📊",                          # Icono que aparecerá en la pestaña
    layout="wide",                           # Layout amplio para mejor visualización
    initial_sidebar_state="expanded"        # Sidebar expandido por defecto
)

def main_page():
    # Cargar datos para mostrar métricas en la página principal
    encuestas_df, preguntas_df, respuestas_df = cargar_datos()
    
    # Título principal con icono
    st.title("📊 Encuestas de Bienestar Estudiantil")
    
    # Descripción principal
    st.markdown("""
    ### ¡Bienvenido al Dashboard de Bienestar Estudiantil! 🎓

    Esta plataforma está diseñada para analizar y visualizar los resultados de las encuestas 
    realizadas a los estudiantes de nuestra institución, permitiéndonos entender mejor las necesidades y experiencias 
    de nuestra comunidad educativa para poder mejorar la calidad de vida de los estudiantes.

    ---
    
    #### 🔍 ¿Qué encontrarás aquí?
    
    * **Página Principal** 🏠
        * Resumen general del proyecto
        * Guía de navegación
        * Información actualizada
    
    * **Análisis de Encuestas** 📝
        * Resultados detallados
        * Tendencias principales
        * Filtros personalizados
    
    * **Gráficos** 📈
        * Visualizaciones interactivas
        * Estadísticas clave
        * Comparativas temporales
    
    ---
    
    #### 🚀 Cómo navegar:
    1. Utiliza el menú de navegación en la barra lateral izquierda
    2. Selecciona la sección que deseas explorar
    3. Interactúa con los gráficos y filtros disponibles
    
    > 💡 **Tip**: Puedes expandir los gráficos haciendo clic en el ícono de expansión 
    en la esquina superior derecha de cada visualización.
    """)
    
    # Información adicional en un expander
    with st.expander("ℹ️ Acerca de los datos"):
        st.write("""
        Los datos presentados en este dashboard provienen de encuestas realizadas 
        a estudiantes de nuestra institución. Todas las respuestas son anónimas 
        y se actualizan periódicamente para mantener la información relevante y actualizada.
        """)
    
    # Métricas importantes en la página principal
    st.subheader("📌 Resumen General")
    col1, col2, col3 = st.columns(3)
    
    if encuestas_df is not None and preguntas_df is not None and respuestas_df is not None:
        # Obtener estadísticas básicas
        estadisticas = obtener_estadisticas_basicas(encuestas_df, preguntas_df, respuestas_df)
        
        with col1:
            st.metric(label="Total de Encuestas", value=estadisticas['total_encuestas'])
        with col2:
            st.metric(label="Total de Preguntas", value=estadisticas['total_preguntas'])
        with col3:
            st.metric(label="Total de Respuestas", value=estadisticas['total_respuestas'])
        
        # Mostrar un gráfico de resumen en la página principal
        st.subheader("📊 Distribución de Encuestas")
        
        # Contar respuestas por encuesta
        if not preguntas_df.empty and not respuestas_df.empty:
            # Unir preguntas y respuestas
            merged_df = pd.merge(
                respuestas_df, 
                preguntas_df[['id', 'survey_id']], 
                left_on='question_id', 
                right_on='id', 
                suffixes=('', '_pregunta')
            )
            
            # Contar respuestas por encuesta
            respuestas_por_encuesta = merged_df.groupby('survey_id').size().reset_index()
            respuestas_por_encuesta.columns = ['survey_id', 'total_respuestas']
            
            # Unir con nombres de encuestas
            respuestas_con_nombres = pd.merge(
                respuestas_por_encuesta,
                encuestas_df[['id', 'titulo']],
                left_on='survey_id',
                right_on='id'
            )
            
            # Crear gráfico
            fig = crear_grafico_barras(
                respuestas_con_nombres.set_index('titulo')['total_respuestas'].to_dict(),
                "Respuestas por Encuesta",
                "Encuesta",
                "Número de Respuestas"
            )
            st.plotly_chart(fig, use_container_width=True)
    else:
        with col1:
            st.metric(label="Total de Encuestas", value="Error de carga", delta="⚠️")
        with col2:
            st.metric(label="Participación Estudiantil", value="Error de carga", delta="⚠️")
        with col3:
            st.metric(label="Total de Respuestas", value="Error de carga", delta="⚠️")
        
def analysis_page():
    st.title("Análisis de Encuestas 📝")
    
    try:
        # Cargar datos
        encuestas_df, preguntas_df, respuestas_df = cargar_datos()
        
        if encuestas_df is None or preguntas_df is None or respuestas_df is None:
            st.error("No se pudieron cargar los datos. Por favor, verifica los archivos CSV.")
            return
        
        # Estadísticas básicas
        estadisticas = obtener_estadisticas_basicas(encuestas_df, preguntas_df, respuestas_df)
        
        # Mostrar métricas principales
        st.subheader("📊 Estadísticas Generales")
        col1, col2, col3 = st.columns(3)
        
        with col1:
            st.metric("Total de Encuestas", estadisticas['total_encuestas'])
        with col2:
            st.metric("Total de Preguntas", estadisticas['total_preguntas'])
        with col3:
            st.metric("Total de Respuestas", estadisticas['total_respuestas'])
        
        # Filtros interactivos
        st.subheader("🔍 Filtros de Análisis")
        
        # Verificar si hay encuestas disponibles
        if encuestas_df.empty:
            st.warning("No hay encuestas disponibles para analizar.")
            return
        
        # Selección de encuesta
        encuesta_ids = encuestas_df['id'].tolist()
        if not encuesta_ids:
            st.warning("No hay IDs de encuestas disponibles.")
            return
            
        encuesta_seleccionada = st.selectbox(
            "Selecciona una encuesta para analizar:",
            options=encuesta_ids,
            format_func=lambda x: encuestas_df[encuestas_df['id'] == x]['titulo'].iloc[0] if not encuestas_df[encuestas_df['id'] == x].empty else f"Encuesta {x}"
        )
        
        # Obtener preguntas de la encuesta seleccionada
        preguntas_encuesta = preguntas_df[preguntas_df['survey_id'] == encuesta_seleccionada]
        
        if preguntas_encuesta.empty:
            st.warning("No hay preguntas disponibles para esta encuesta.")
            return
        
        # Selección de pregunta
        pregunta_ids = preguntas_encuesta['id'].tolist()
        if not pregunta_ids:
            st.warning("No hay IDs de preguntas disponibles.")
            return
            
        pregunta_seleccionada = st.selectbox(
            "Selecciona una pregunta para analizar:",
            options=pregunta_ids,
            format_func=lambda x: preguntas_encuesta[preguntas_encuesta['id'] == x]['pregunta'].iloc[0] if not preguntas_encuesta[preguntas_encuesta['id'] == x].empty else f"Pregunta {x}"
        )
        
        # Obtener respuestas para la pregunta seleccionada
        respuestas_pregunta = respuestas_df[respuestas_df['question_id'] == pregunta_seleccionada]
        
        if respuestas_pregunta.empty:
            st.warning("No hay respuestas disponibles para esta pregunta.")
            return
        
        # Obtener información de la pregunta seleccionada
        pregunta_info = preguntas_encuesta[preguntas_encuesta['id'] == pregunta_seleccionada]
        if pregunta_info.empty:
            st.warning("No se encontró información para esta pregunta.")
            return
        
        # Extraer texto y tipo de pregunta de manera segura
        try:
            pregunta_texto = pregunta_info['pregunta'].iloc[0]
            tipo_pregunta = pregunta_info['tipo_pregunta'].iloc[0]
        except (KeyError, IndexError):
            st.warning("No se pudo obtener la información completa de la pregunta.")
            return
        
        st.subheader(f"Análisis de: {pregunta_texto}")
        
        # Análisis simplificado para todos los tipos de preguntas
        # Contar frecuencias de respuestas
        try:
            conteo_respuestas = respuestas_pregunta['respuesta'].value_counts().reset_index()
            conteo_respuestas.columns = ['Respuesta', 'Cantidad']
            
            # Mostrar tabla de frecuencias
            st.write("Distribución de respuestas:")
            st.dataframe(conteo_respuestas)
            
            # Crear visualización simple con barras de progreso
            st.write("Visualización:")
            total = conteo_respuestas['Cantidad'].sum()
            
            for idx, row in conteo_respuestas.iterrows():
                porcentaje = row['Cantidad'] / total * 100
                st.write(f"**{row['Respuesta']}**: {row['Cantidad']} respuestas ({porcentaje:.1f}%)")
                st.progress(porcentaje / 100)
            
            # Mostrar gráfico de barras simple
            st.write("Gráfico de barras:")
            fig = crear_grafico_barras(
                conteo_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                f"Distribución de respuestas: {pregunta_texto}",
                "Respuesta",
                "Cantidad"
            )
            st.plotly_chart(fig, use_container_width=True)
            
        except Exception as e:
            st.error(f"Error al analizar las respuestas: {e}")
            st.write("Mostrando datos en formato simple:")
            st.dataframe(respuestas_pregunta)
    
    except Exception as e:
        st.error(f"Error en el análisis: {e}")
        st.write("Por favor, verifica los datos y la estructura de los archivos CSV.")
        import traceback
        st.code(traceback.format_exc())

def grafics_page():
    st.title("Gráficos y Visualizaciones 📈")
    
    # Cargar datos
    encuestas_df, preguntas_df, respuestas_df = cargar_datos()
    
    if encuestas_df is None or preguntas_df is None or respuestas_df is None:
        st.error("No se pudieron cargar los datos. Por favor, verifica los archivos CSV.")
        return
    
    # Sección de filtros interactivos
    st.sidebar.subheader("🔍 Filtros Interactivos")
    
    # Filtro por categoría de análisis
    categoria_analisis = st.sidebar.selectbox(
        "Selecciona categoría de análisis:",
        ["Demografía", "Salud Física", "Salud Mental", "Hábitos de Estudio", "Vida Social"]
    )
    
    # Contenedor principal para visualizaciones
    main_container = st.container()
    
    with main_container:
        if categoria_analisis == "Demografía":
            st.subheader("📊 Análisis Demográfico")
            
            # Análisis demográfico
            datos_demograficos = analizar_demograficos(respuestas_df, preguntas_df)
            
            if datos_demograficos and 'edad' in datos_demograficos:
                # Estadísticas de edad
                col1, col2, col3 = st.columns(3)
                with col1:
                    st.metric("Edad Promedio", f"{datos_demograficos['edad']['promedio']:.0f} años")
                with col2:
                    st.metric("Edad Mínima", f"{datos_demograficos['edad']['min']:.0f} años")
                with col3:
                    st.metric("Edad Máxima", f"{datos_demograficos['edad']['max']:.0f} años")
                
                # Distribución de edades como tabla con filtro
                st.subheader("Distribución de edades de los estudiantes")
                
                # Convertir el diccionario de distribución a DataFrame para mejor manipulación
                if datos_demograficos['edad']['distribucion']:
                    df_edades = pd.DataFrame({
                        'Edad': [int(float(k)) for k in datos_demograficos['edad']['distribucion'].keys()],
                        'Cantidad': list(datos_demograficos['edad']['distribucion'].values())
                    })
                    
                    # Ordenar por edad
                    df_edades = df_edades.sort_values('Edad')
                    
                    # Crear slider para filtrar edades
                    min_edad = int(df_edades['Edad'].min())
                    max_edad = int(df_edades['Edad'].max())
                    
                    rango_edad = st.slider(
                        "Filtrar por rango de edad:",
                        min_value=min_edad,
                        max_value=max_edad,
                        value=(min_edad, max_edad)
                    )
                    
                    # Filtrar datos según el slider
                    df_filtrado = df_edades[(df_edades['Edad'] >= rango_edad[0]) & (df_edades['Edad'] <= rango_edad[1])]
                    
                    # Mostrar tabla
                    st.write(f"Mostrando edades entre {rango_edad[0]} y {rango_edad[1]} años:")
                    st.dataframe(df_filtrado, use_container_width=True)
                    
                    # Mostrar métricas para el rango filtrado
                    total_estudiantes = df_filtrado['Cantidad'].sum()
                    edad_promedio_filtrada = (df_filtrado['Edad'] * df_filtrado['Cantidad']).sum() / total_estudiantes if total_estudiantes > 0 else 0
                    
                    col1, col2 = st.columns(2)
                    with col1:
                        st.metric("Total de estudiantes en este rango", f"{total_estudiantes}")
                    with col2:
                        st.metric("Edad promedio en este rango", f"{int(edad_promedio_filtrada)} años")
                else:
                    st.info("No hay datos de edades disponibles.")
            
            if datos_demograficos and 'genero' in datos_demograficos:
                # Distribución por género como tabla interactiva
                st.subheader("👤 Distribución por género")
                
                # Convertir diccionario a DataFrame
                if datos_demograficos['genero']:
                    df_genero = pd.DataFrame({
                        'Género': list(datos_demograficos['genero'].keys()),
                        'Cantidad': list(datos_demograficos['genero'].values())
                    })
                    
                    # Calcular porcentajes
                    total = df_genero['Cantidad'].sum()
                    df_genero['Porcentaje'] = (df_genero['Cantidad'] / total * 100).round(1).astype(str) + '%'
                    
                    # Crear contenedor para sidebar y tabla principal
                    col_sidebar, col_tabla = st.columns([1, 3])
                    
                    with col_sidebar:
                        st.markdown("### Filtros")
                        st.markdown("---")
                        
                        # Opciones de visualización
                        mostrar_porcentaje = st.checkbox("Mostrar porcentajes", value=True)
                        
                        # Filtro por género (multiselect)
                        generos_disponibles = df_genero['Género'].tolist()
                        generos_seleccionados = st.multiselect(
                            "Seleccionar géneros:",
                            options=generos_disponibles,
                            default=generos_disponibles
                        )
                        
                        # Ordenar por
                        orden = st.radio(
                            "Ordenar por:",
                            options=["Cantidad (mayor a menor)", "Cantidad (menor a mayor)", "Alfabético"]
                        )
                        
                        # Botón para reiniciar filtros
                        if st.button("Reiniciar filtros"):
                            generos_seleccionados = generos_disponibles
                            mostrar_porcentaje = True
                            orden = "Cantidad (mayor a menor)"
                    
                    with col_tabla:
                        # Aplicar filtros
                        df_filtrado = df_genero[df_genero['Género'].isin(generos_seleccionados)]
                        
                        # Aplicar ordenamiento
                        if orden == "Cantidad (mayor a menor)":
                            df_filtrado = df_filtrado.sort_values('Cantidad', ascending=False)
                        elif orden == "Cantidad (menor a mayor)":
                            df_filtrado = df_filtrado.sort_values('Cantidad', ascending=True)
                        else:  # Alfabético
                            df_filtrado = df_filtrado.sort_values('Género')
                        
                        # Seleccionar columnas a mostrar
                        if mostrar_porcentaje:
                            df_mostrar = df_filtrado[['Género', 'Cantidad', 'Porcentaje']]
                        else:
                            df_mostrar = df_filtrado[['Género', 'Cantidad']]
                        
                        # Mostrar tabla
                        st.dataframe(df_mostrar, use_container_width=True)
                        
                        # Mostrar resumen
                        total_filtrado = df_filtrado['Cantidad'].sum()
                        st.markdown(f"**Total de estudiantes seleccionados:** {total_filtrado} ({(total_filtrado/total*100):.1f}% del total)")
                        
                        # Mostrar distribución visual con barras horizontales
                        st.markdown("### Distribución visual")
                        for idx, row in df_filtrado.iterrows():
                            porcentaje = row['Cantidad'] / total * 100
                            st.markdown(f"**{row['Género']}**")
                            st.progress(porcentaje / 100)
                            st.markdown(f"{row['Cantidad']} estudiantes ({porcentaje:.1f}%)")
                else:
                    st.info("No hay datos de género disponibles.")
            
            if datos_demograficos and 'programa' in datos_demograficos:
                # Distribución por programa académico como tabla interactiva
                st.subheader("🎓 Distribución por programa académico")
                
                # Convertir diccionario a DataFrame
                if datos_demograficos['programa']:
                    df_programas = pd.DataFrame({
                        'Programa': list(datos_demograficos['programa'].keys()),
                        'Cantidad': list(datos_demograficos['programa'].values())
                    })
                    
                    # Calcular porcentajes
                    total = df_programas['Cantidad'].sum()
                    df_programas['Porcentaje'] = (df_programas['Cantidad'] / total * 100).round(1).astype(str) + '%'
                    
                    # Crear contenedor para sidebar y tabla principal
                    col_sidebar, col_tabla = st.columns([1, 3])
                    
                    with col_sidebar:
                        st.markdown("### Filtros")
                        st.markdown("---")
                        
                        # Opciones de visualización
                        mostrar_porcentaje = st.checkbox("Mostrar porcentajes", value=True, key="prog_mostrar_porcentaje")
                        
                        # Limitar número de programas a mostrar
                        max_programas = st.slider(
                            "Número de programas a mostrar:", 
                            min_value=1, 
                            max_value=min(20, len(df_programas)), 
                            value=min(10, len(df_programas))
                        )
                        
                        # Búsqueda por texto
                        busqueda = st.text_input("Buscar programa:").lower()
                        
                        # Ordenar por
                        orden = st.radio(
                            "Ordenar por:",
                            options=["Cantidad (mayor a menor)", "Cantidad (menor a mayor)", "Alfabético"],
                            key="prog_orden"
                        )
                        
                        # Botón para reiniciar filtros
                        if st.button("Reiniciar filtros", key="prog_reiniciar"):
                            busqueda = ""
                            mostrar_porcentaje = True
                            orden = "Cantidad (mayor a menor)"
                            max_programas = min(10, len(df_programas))
                    
                    with col_tabla:
                        # Aplicar filtros de búsqueda
                        if busqueda:
                            df_filtrado = df_programas[df_programas['Programa'].str.lower().str.contains(busqueda)]
                        else:
                            df_filtrado = df_programas.copy()
                        
                        # Aplicar ordenamiento
                        if orden == "Cantidad (mayor a menor)":
                            df_filtrado = df_filtrado.sort_values('Cantidad', ascending=False)
                        elif orden == "Cantidad (menor a mayor)":
                            df_filtrado = df_filtrado.sort_values('Cantidad', ascending=True)
                        else:  # Alfabético
                            df_filtrado = df_filtrado.sort_values('Programa')
                        
                        # Limitar número de programas
                        df_filtrado = df_filtrado.head(max_programas)
                        
                        # Seleccionar columnas a mostrar
                        if mostrar_porcentaje:
                            df_mostrar = df_filtrado[['Programa', 'Cantidad', 'Porcentaje']]
                        else:
                            df_mostrar = df_filtrado[['Programa', 'Cantidad']]
                        
                        # Mostrar tabla
                        st.dataframe(df_mostrar, use_container_width=True)
                        
                        # Mostrar resumen
                        total_filtrado = df_filtrado['Cantidad'].sum()
                        st.markdown(f"**Total de estudiantes en programas mostrados:** {total_filtrado} ({(total_filtrado/total*100):.1f}% del total)")
                        
                        # Mostrar distribución visual con barras horizontales
                        st.markdown("### Distribución visual")
                        for idx, row in df_filtrado.iterrows():
                            porcentaje = row['Cantidad'] / total * 100
                            st.markdown(f"**{row['Programa']}**")
                            st.progress(porcentaje / 100)
                            st.markdown(f"{row['Cantidad']} estudiantes ({porcentaje:.1f}%)")
                else:
                    st.info("No hay datos de programas académicos disponibles.")
        
        elif categoria_analisis == "Salud Física":
            st.subheader("💪 Análisis de Salud Física")
            
            # Análisis de salud física
            datos_salud = analizar_salud_fisica(respuestas_df, preguntas_df)
            
            if datos_salud:
                # Selector de pregunta específica
                pregunta_salud = st.selectbox(
                    "Selecciona una pregunta para visualizar:",
                    list(datos_salud.keys())
                )
                
                # Visualizar datos de la pregunta seleccionada
                datos_pregunta = datos_salud[pregunta_salud]
                
                # Convertir a DataFrame para mejor manipulación
                df_respuestas = pd.DataFrame({
                    'Respuesta': list(datos_pregunta.keys()),
                    'Cantidad': list(datos_pregunta.values())
                })
                
                # Calcular porcentajes
                total = df_respuestas['Cantidad'].sum()
                df_respuestas['Porcentaje'] = (df_respuestas['Cantidad'] / total * 100).round(1).astype(str) + '%'
                
                # Crear contenedor para filtros y tabla
                col_filtros, col_visualizacion = st.columns([1, 3])
                
                with col_filtros:
                    st.markdown("### Filtros")
                    st.markdown("---")
                    
                    # Opciones de visualización
                    mostrar_porcentaje = st.checkbox("Mostrar porcentajes", value=True, key="salud_mostrar_porcentaje")
                    
                    # Ordenar por
                    orden = st.radio(
                        "Ordenar por:",
                        options=["Cantidad (mayor a menor)", "Cantidad (menor a mayor)", "Alfabético"],
                        key="salud_orden"
                    )
                    
                    # Tipo de visualización
                    tipo_viz = st.radio(
                        "Tipo de visualización:",
                        options=["Tabla y barras", "Gráfico de barras", "Gráfico circular"],
                        key="salud_tipo_viz"
                    )
                
                with col_visualizacion:
                    # Aplicar ordenamiento
                    if orden == "Cantidad (mayor a menor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=False)
                    elif orden == "Cantidad (menor a mayor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=True)
                    else:  # Alfabético
                        df_respuestas = df_respuestas.sort_values('Respuesta')
                    
                    # Seleccionar columnas a mostrar
                    if mostrar_porcentaje:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad', 'Porcentaje']]
                    else:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad']]
                    
                    # Mostrar según el tipo de visualización seleccionado
                    if tipo_viz == "Tabla y barras":
                        # Mostrar tabla
                        st.dataframe(df_mostrar, use_container_width=True)
                        
                        # Mostrar distribución visual con barras horizontales
                        st.markdown("### Distribución visual")
                        for idx, row in df_respuestas.iterrows():
                            porcentaje = row['Cantidad'] / total * 100
                            st.markdown(f"**{row['Respuesta']}**")
                            st.progress(porcentaje / 100)
                            st.markdown(f"{row['Cantidad']} respuestas ({porcentaje:.1f}%)")
                    
                    elif tipo_viz == "Gráfico de barras":
                        # Gráfico de barras
                        fig_salud = crear_grafico_barras(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"{pregunta_salud}",
                            "Respuesta",
                            "Cantidad"
                        )
                        st.plotly_chart(fig_salud, use_container_width=True)
                    
                    else:  # Gráfico circular
                        # Gráfico de pastel
                        fig_salud_pie = crear_grafico_pie(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"Proporción de respuestas: {pregunta_salud}"
                        )
                        st.plotly_chart(fig_salud_pie, use_container_width=True)
        
        elif categoria_analisis == "Salud Mental":
            st.subheader("🧠 Análisis de Salud Mental")
            
            # Análisis de salud mental
            datos_mental = analizar_salud_mental(respuestas_df, preguntas_df)
            
            if datos_mental:
                # Selector de pregunta específica
                pregunta_mental = st.selectbox(
                    "Selecciona una pregunta para visualizar:",
                    list(datos_mental.keys())
                )
                
                # Visualizar datos de la pregunta seleccionada
                datos_pregunta = datos_mental[pregunta_mental]
                
                # Convertir a DataFrame para mejor manipulación
                df_respuestas = pd.DataFrame({
                    'Respuesta': list(datos_pregunta.keys()),
                    'Cantidad': list(datos_pregunta.values())
                })
                
                # Calcular porcentajes
                total = df_respuestas['Cantidad'].sum()
                df_respuestas['Porcentaje'] = (df_respuestas['Cantidad'] / total * 100).round(1).astype(str) + '%'
                
                # Crear contenedor para filtros y tabla
                col_filtros, col_visualizacion = st.columns([1, 3])
                
                with col_filtros:
                    st.markdown("### Filtros")
                    st.markdown("---")
                    
                    # Opciones de visualización
                    mostrar_porcentaje = st.checkbox("Mostrar porcentajes", value=True, key="mental_mostrar_porcentaje")
                    
                    # Ordenar por
                    orden = st.radio(
                        "Ordenar por:",
                        options=["Cantidad (mayor a menor)", "Cantidad (menor a mayor)", "Alfabético"],
                        key="mental_orden"
                    )
                    
                    # Tipo de visualización
                    tipo_viz = st.radio(
                        "Tipo de visualización:",
                        options=["Tabla y barras", "Gráfico de barras", "Gráfico circular"],
                        key="mental_tipo_viz"
                    )
                    
                    # Destacar valor máximo/mínimo
                    destacar = st.checkbox("Destacar valor máximo", value=True, key="mental_destacar")
                
                with col_visualizacion:
                    # Aplicar ordenamiento
                    if orden == "Cantidad (mayor a menor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=False)
                    elif orden == "Cantidad (menor a mayor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=True)
                    else:  # Alfabético
                        df_respuestas = df_respuestas.sort_values('Respuesta')
                    
                    # Seleccionar columnas a mostrar
                    if mostrar_porcentaje:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad', 'Porcentaje']]
                    else:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad']]
                    
                    # Mostrar según el tipo de visualización seleccionado
                    if tipo_viz == "Tabla y barras":
                        # Mostrar tabla
                        st.dataframe(df_mostrar, use_container_width=True)
                        
                        # Mostrar distribución visual con barras horizontales
                        st.markdown("### Distribución visual")
                        
                        # Encontrar valor máximo para destacar
                        max_valor = df_respuestas['Cantidad'].max()
                        
                        for idx, row in df_respuestas.iterrows():
                            porcentaje = row['Cantidad'] / total * 100
                            
                            # Destacar el valor máximo si está activado
                            if destacar and row['Cantidad'] == max_valor:
                                st.markdown(f"**{row['Respuesta']}** 🔥")
                                st.progress(porcentaje / 100)
                                st.markdown(f"**{row['Cantidad']} respuestas ({porcentaje:.1f}%)** - *Respuesta más común*")
                            else:
                                st.markdown(f"**{row['Respuesta']}**")
                                st.progress(porcentaje / 100)
                                st.markdown(f"{row['Cantidad']} respuestas ({porcentaje:.1f}%)")
                    
                    elif tipo_viz == "Gráfico de barras":
                        # Gráfico de barras
                        fig_mental = crear_grafico_barras(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"{pregunta_mental}",
                            "Respuesta",
                            "Cantidad"
                        )
                        st.plotly_chart(fig_mental, use_container_width=True)
                    
                    else:  # Gráfico circular
                        # Gráfico de pastel
                        fig_mental_pie = crear_grafico_pie(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"Proporción de respuestas: {pregunta_mental}"
                        )
                        st.plotly_chart(fig_mental_pie, use_container_width=True)
        
        elif categoria_analisis == "Hábitos de Estudio":
            st.subheader("📚 Análisis de Hábitos de Estudio")
            
            # Análisis de hábitos de estudio
            datos_habitos = analizar_habitos_estudio(respuestas_df, preguntas_df)
            
            if datos_habitos:
                # Selector de pregunta específica
                pregunta_habitos = st.selectbox(
                    "Selecciona una pregunta para visualizar:",
                    list(datos_habitos.keys())
                )
                
                # Visualizar datos de la pregunta seleccionada
                datos_pregunta = datos_habitos[pregunta_habitos]
                
                # Convertir a DataFrame para mejor manipulación
                df_respuestas = pd.DataFrame({
                    'Respuesta': list(datos_pregunta.keys()),
                    'Cantidad': list(datos_pregunta.values())
                })
                
                # Calcular porcentajes
                total = df_respuestas['Cantidad'].sum()
                df_respuestas['Porcentaje'] = (df_respuestas['Cantidad'] / total * 100).round(1).astype(str) + '%'
                df_respuestas['Porcentaje_Num'] = (df_respuestas['Cantidad'] / total * 100).round(1)
                
                # Crear contenedor para filtros y tabla
                col_filtros, col_visualizacion = st.columns([1, 3])
                
                with col_filtros:
                    st.markdown("### Filtros")
                    st.markdown("---")
                    
                    # Opciones de visualización
                    mostrar_porcentaje = st.checkbox("Mostrar porcentajes", value=True, key="habitos_mostrar_porcentaje")
                    
                    # Ordenar por
                    orden = st.radio(
                        "Ordenar por:",
                        options=["Cantidad (mayor a menor)", "Cantidad (menor a mayor)", "Alfabético"],
                        key="habitos_orden"
                    )
                    
                    # Tipo de visualización
                    tipo_viz = st.radio(
                        "Tipo de visualización:",
                        options=["Tabla y barras", "Gráfico de barras", "Gráfico circular", "Comparativa"],
                        key="habitos_tipo_viz"
                    )
                    
                    # Filtro por porcentaje mínimo
                    if len(df_respuestas) > 0:
                        min_porcentaje = float(df_respuestas['Porcentaje_Num'].min())
                        max_porcentaje = float(df_respuestas['Porcentaje_Num'].max())
                        
                        filtro_porcentaje = st.slider(
                            "Filtrar por porcentaje mínimo:",
                            min_value=min_porcentaje,
                            max_value=max_porcentaje,
                            value=min_porcentaje,
                            step=1.0,
                            key="habitos_filtro_porcentaje"
                        )
                
                with col_visualizacion:
                    # Aplicar filtro por porcentaje
                    df_respuestas = df_respuestas[df_respuestas['Porcentaje_Num'] >= filtro_porcentaje]
                    
                    # Aplicar ordenamiento
                    if orden == "Cantidad (mayor a menor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=False)
                    elif orden == "Cantidad (menor a mayor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=True)
                    else:  # Alfabético
                        df_respuestas = df_respuestas.sort_values('Respuesta')
                    
                    # Seleccionar columnas a mostrar
                    if mostrar_porcentaje:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad', 'Porcentaje']]
                    else:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad']]
                    
                    # Mostrar según el tipo de visualización seleccionado
                    if tipo_viz == "Tabla y barras":
                        # Mostrar tabla
                        st.dataframe(df_mostrar, use_container_width=True)
                        
                        # Mostrar distribución visual con barras horizontales
                        st.markdown("### Distribución visual")
                        for idx, row in df_respuestas.iterrows():
                            porcentaje = row['Cantidad'] / total * 100
                            st.markdown(f"**{row['Respuesta']}**")
                            st.progress(porcentaje / 100)
                            st.markdown(f"{row['Cantidad']} respuestas ({porcentaje:.1f}%)")
                    
                    elif tipo_viz == "Gráfico de barras":
                        # Gráfico de barras
                        fig_habitos = crear_grafico_barras(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"{pregunta_habitos}",
                            "Respuesta",
                            "Cantidad"
                        )
                        st.plotly_chart(fig_habitos, use_container_width=True)
                    
                    elif tipo_viz == "Gráfico circular":
                        # Gráfico de pastel
                        fig_habitos_pie = crear_grafico_pie(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"Proporción de respuestas: {pregunta_habitos}"
                        )
                        st.plotly_chart(fig_habitos_pie, use_container_width=True)
                    
                    else:  # Comparativa
                        # Mostrar gráfico comparativo de barras y pastel lado a lado
                        col1, col2 = st.columns(2)
                        
                        with col1:
                            st.markdown("#### Distribución por cantidad")
                            fig_barras = crear_grafico_barras(
                                df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                                f"Cantidad de respuestas",
                                "Respuesta",
                                "Cantidad"
                            )
                            st.plotly_chart(fig_barras, use_container_width=True)
                        
                        with col2:
                            st.markdown("#### Distribución por porcentaje")
                            fig_pie = crear_grafico_pie(
                                df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                                f"Proporción de respuestas"
                            )
                            st.plotly_chart(fig_pie, use_container_width=True)
        
        elif categoria_analisis == "Vida Social":
            st.subheader("👥 Análisis de Vida Social")
            
            # Análisis de vida social
            datos_social = analizar_vida_social(respuestas_df, preguntas_df)
            
            if datos_social:
                # Selector de pregunta específica
                pregunta_social = st.selectbox(
                    "Selecciona una pregunta para visualizar:",
                    list(datos_social.keys())
                )
                
                # Visualizar datos de la pregunta seleccionada
                datos_pregunta = datos_social[pregunta_social]
                
                # Convertir a DataFrame para mejor manipulación
                df_respuestas = pd.DataFrame({
                    'Respuesta': list(datos_pregunta.keys()),
                    'Cantidad': list(datos_pregunta.values())
                })
                
                # Calcular porcentajes
                total = df_respuestas['Cantidad'].sum()
                df_respuestas['Porcentaje'] = (df_respuestas['Cantidad'] / total * 100).round(1).astype(str) + '%'
                
                # Crear contenedor para filtros y tabla
                col_filtros, col_visualizacion = st.columns([1, 3])
                
                with col_filtros:
                    st.markdown("### Filtros")
                    st.markdown("---")
                    
                    # Opciones de visualización
                    mostrar_porcentaje = st.checkbox("Mostrar porcentajes", value=True, key="social_mostrar_porcentaje")
                    
                    # Ordenar por
                    orden = st.radio(
                        "Ordenar por:",
                        options=["Cantidad (mayor a menor)", "Cantidad (menor a mayor)", "Alfabético"],
                        key="social_orden"
                    )
                    
                    # Tipo de visualización
                    tipo_viz = st.radio(
                        "Tipo de visualización:",
                        options=["Tabla y barras", "Gráfico de barras", "Gráfico circular"],
                        key="social_tipo_viz"
                    )
                    
                
                with col_visualizacion:
                    # Aplicar ordenamiento
                    if orden == "Cantidad (mayor a menor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=False)
                    elif orden == "Cantidad (menor a mayor)":
                        df_respuestas = df_respuestas.sort_values('Cantidad', ascending=True)
                    else:  # Alfabético
                        df_respuestas = df_respuestas.sort_values('Respuesta')
                    
                    # Seleccionar columnas a mostrar
                    if mostrar_porcentaje:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad', 'Porcentaje']]
                    else:
                        df_mostrar = df_respuestas[['Respuesta', 'Cantidad']]
                    
                    # Mostrar según el tipo de visualización seleccionado
                    if tipo_viz == "Tabla y barras":
                        # Mostrar tabla
                        st.dataframe(df_mostrar, use_container_width=True)
                        
                        # Mostrar distribución visual con barras horizontales
                        st.markdown("### Distribución visual")
                        for idx, row in df_respuestas.iterrows():
                            porcentaje = row['Cantidad'] / total * 100
                            st.markdown(f"**{row['Respuesta']}**")
                            st.progress(porcentaje / 100)
                            st.markdown(f"{row['Cantidad']} respuestas ({porcentaje:.1f}%)")
                    
                    elif tipo_viz == "Gráfico de barras":
                        # Gráfico de barras
                        fig_social = crear_grafico_barras(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"{pregunta_social}",
                            "Respuesta",
                            "Cantidad"
                        )
                        st.plotly_chart(fig_social, use_container_width=True)
                    
                    elif tipo_viz == "Gráfico circular":
                        # Gráfico de pastel
                        fig_social_pie = crear_grafico_pie(
                            df_respuestas.set_index('Respuesta')['Cantidad'].to_dict(),
                            f"Proporción de respuestas: {pregunta_social}"
                        )
                        st.plotly_chart(fig_social_pie, use_container_width=True)
                    
                    
                        
                        # Mostrar resumen
                        st.markdown(f"**Total de respuestas:** {total}")
                        
                        # Mostrar respuesta más común
                        respuesta_comun = df_respuestas.iloc[0]['Respuesta'] if not df_respuestas.empty else ""
                        porcentaje_comun = (df_respuestas.iloc[0]['Cantidad'] / total * 100) if not df_respuestas.empty else 0
                        
                        st.markdown(f"**Respuesta más común:** {respuesta_comun} ({porcentaje_comun:.1f}%)")
                        
                        # Mostrar distribución en forma de emoji
                        st.markdown("### Representación visual")
                        emoji_map = {
                            "Nunca": "❌", 
                            "Ocasionalmente": "🔶", 
                            "A veces": "🔶",
                            "Frecuentemente": "✅", 
                            "Siempre": "✅✅",
                            "Muy buena": "😄", 
                            "Buena": "🙂", 
                            "Neutral": "😐", 
                            "Mala": "😞",
                            "Amplio": "👨‍👩‍👧‍👦", 
                            "Moderado": "👨‍👩‍👦", 
                            "Pequeño": "👤👤", 
                            "Ninguno": "👤",
                            "Totalmente": "🌟🌟🌟", 
                            "Parcialmente": "🌟🌟", 
                            "Poco": "🌟", 
                            "Nada": "⭐"
                        }
                        
                        for idx, row in df_respuestas.iterrows():
                            emoji = emoji_map.get(row['Respuesta'], "📊")
                            st.markdown(f"**{row['Respuesta']}**: {emoji} ({row['Porcentaje']})")
            else:
                st.info("No hay datos de vida social disponibles.")
        
        
        # Sección de patrones y tendencias
        st.subheader("🔍 Patrones y Tendencias Identificadas")
        
        patrones = identificar_patrones(respuestas_df, preguntas_df)
        
        # Eliminamos la sección de tendencia diaria ya que no tenemos esos datos
        
        if patrones and 'homogeneidad' in patrones:
            # Preguntas con respuestas más homogéneas
            st.write("Preguntas con mayor consenso (respuestas más homogéneas):")
            
            for i, (pregunta, datos) in enumerate(list(patrones['homogeneidad'].items())[:5]):
                st.write(f"**{i+1}. {pregunta}**")
                st.write(f"   - Respuesta más común: **{datos['respuesta_comun']}** ({datos['porcentaje']:.1f}% de las respuestas)")
            
            # Visualizar homogeneidad
            homogeneidad_data = {pregunta: datos['concentracion'] for pregunta, datos in list(patrones['homogeneidad'].items())[:5]}
            
            fig_homogeneidad = crear_grafico_barras(
                homogeneidad_data,
                "Nivel de consenso en las respuestas",
                "Pregunta",
                "Índice de consenso (0-1)"
            )
            st.plotly_chart(fig_homogeneidad, use_container_width=True)

st.sidebar.title("Navegación")
page = st.sidebar.radio('Selecciona una página', ['Página Principal', 'Análisis de Encuestas', 'Graficos'])

if page == 'Página Principal':
    main_page()
elif page == 'Análisis de Encuestas':
    analysis_page()
elif page == 'Graficos':
    grafics_page()

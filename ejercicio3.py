import requests
import os
from dotenv import load_dotenv
from unidecode import unidecode

# Cargar variables de entorno desde el archivo .env
load_dotenv()
API_KEY = os.getenv("API_KEY")

# Función para obtener una lista normalizada de nombres de países en español
def obtener_lista_paises():
    URL = "https://restcountries.com/v3.1/all"
   
    try:
        response = requests.get(URL)
        response.raise_for_status() 

        data = response.json()

        # Crear una lista de nombres de países normalizados en minúsculas
        lista_paises = [
        unidecode(pais["translations"]["spa"]["common"] #Acceder al campo en español
       .strip() #Eliminar espacios al inicio y al final 
       .lower()) #Transformar en minúscula
       for pais in data
       ]
        return lista_paises
    except:print("Error al obtener la lista de países:")

# Función principal para obtener y mostrar datos climáticos
def obtener_datos_climaticos():
    try:
        # Solicitar nombres de países al usuario
        paises_input = input("Ingrese uno o varios nombres de países: ")
        paises = [
        unidecode # Formatear el código para eliminar diacrícticos
        (pais
        .lower() #Transformar en minúscula
        .strip()) #Eliminar espacios al inicio y al final
        for pais in paises_input.split(",") # Separar por comas en caso de varios países o un país con varias palabras
]
        # Obtener la lista completa de nombres de países normalizados
        lista_paises = obtener_lista_paises()

        # Encontrar palabras ingresadas que NO coinciden con nombres de países
        palabras_no_coincidentes = [pais for pais in paises if pais not in lista_paises]

        if len(palabras_no_coincidentes) > 0:
            print(f"La/s palabra/s ingresada/s: {', '.join(palabras_no_coincidentes).upper()} no coincide con un país, por favor intentelo nuevamente.")
        
        # Encontrar países ingresados que coinciden con nombres de países
        paises_coincidentes = [pais for pais in paises if pais in lista_paises]
    
        # Obtener y mostrar datos climáticos para los países coincidentes
        for pais in paises_coincidentes:
            URL = "https://api.openweathermap.org/data/2.5/weather"
            parametros = {
                "q": pais,
                "appid": API_KEY,
                "units": "metric",
                "lang": "es"
            }

            try:
                response = requests.get(URL, params=parametros)
                response.raise_for_status()

                data = response.json()


                print(f""" 
                Ubicación: {data["name"]},
                Descripción del clima: {data["weather"][0]["description"]},
                Temperatura: {data["main"]["temp"]} Cº,
                Temperatura mínima: {data["main"]["temp_min"]} Cº,
                Temperatura máxima: {data["main"]["temp_max"]} Cº
                """)
            except:print("Se produjo un error al obtener los datos de la API. Por favor, asegúrese de que su API KEY esté configurada correctamente e intente nuevamente. Si el error persiste, es posible que este país no esté disponible en la API OpenWeatherMap.")

    except:
        print("No se ha encontrado el/los país/es ingresado/s, por favor, intente nuevamente")


# Llamar a la función principal para obtener y mostrar datos climáticos
obtener_datos_climaticos()

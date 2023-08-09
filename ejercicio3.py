import requests
import os
from dotenv import load_dotenv
from unidecode import unidecode

load_dotenv()
API_KEY = os.getenv("API_KEY")

def obtener_lista_paises():
    URL = "https://restcountries.com/v3.1/all"
   
    try:
        response = requests.get(URL)
        response.raise_for_status() 

        data = response.json()

        lista_paises = [
        unidecode(pais["translations"]["spa"]["common"]
       .strip()
       .lower())
       for pais in data
       ]
        return lista_paises
    except:print("Error al obtener la lista de países:")

def obtener_datos_climaticos():
    try:
        paises_input = input("Ingrese uno o varios nombres de países: ")
        paises = [
        unidecode(pais.lower().strip())
        for pais in paises_input.split(",")
]

        lista_paises = obtener_lista_paises()

        palabras_no_coincidentes = [pais for pais in paises if pais not in lista_paises]

        if len(palabras_no_coincidentes) > 0:
            print(f"La/s palabra/s ingresada/s: {', '.join(palabras_no_coincidentes).upper()} no coincide con un país, por favor intentelo nuevamente.")
        
        paises_coincidentes = [pais for pais in paises if pais in lista_paises] #busca que cada palabra ingresada en el input coincidan con un país de la lista_paises
    
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
            except:print("Algo salió mal con la solicitud:")

    except:
        print("No se ha encontrado el/los país/es ingresado/s, por favor, intente nuevamente")

obtener_datos_climaticos()

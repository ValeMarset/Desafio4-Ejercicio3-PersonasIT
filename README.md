# Desafío4 Ejercicio 3 PersonasIT

Esta aplicación te permite obtener datos climáticos de países de todo el mundo utilizando la API de OpenWeatherMap.

# Comentarios sobre el ejercicio

Dado que el ejercicio requiere mostrar datos de uno o varios países, utilicé la API "restcountries.com" para obtener una lista de países y basándome en ella, comparé si las palabras ingresadas por el usuario correspondían a países o no. Además he implementado una interfaz de usuario sencilla que permite interactuar con la aplicación.

## Uso

1. Clona este repositorio en tu computadora.
2. No olvodes insertar tu API_KEY, sino no podrás probar la funcionalidad.
3. Abre el archivo `index.html` en tu navegador.
4. Ingresa el o los nombres de los países en el campo de entrada.
5. Haz clic en el botón "Obtener Datos Climáticos".

## Uso de async/await en lugar de .then

Opté por utilizar `async/await` en lugar de `.then` para manejar las promesas en las funciones `obtenerDatosClimaticos()` y `obtenerListaPaises()`. Esta elección se basa en la legibilidad y simplicidad del código, ya que `async/await` facilita la escritura y comprensión de código asíncrono al seguir una estructura más similar a la programación síncrona.

## Uso de Datos de la API

La función `obtenerDatosClimaticos()` es una función asíncrona que realiza las siguientes acciones:

- Obtiene la lista de nombres de países ingresados por el usuario desde un campo de entrada en la página.
- Divide la entrada en una lista de países y normaliza los nombres.
- Filtra las palabras que no coinciden con los nombres de países disponibles.
- Realiza solicitudes a la API de OpenWeatherMap para obtener los datos climáticos de cada país.
- Muestra los datos climáticos en la sección correspondiente de la página web y en la consola del navegador.
- Maneja posibles errores, como cuando no se encuentran los países ingresados o hay problemas con la API.

## Obtención de la Lista de Países

La función `obtenerListaPaises()` es una función asíncrona que realiza las siguientes acciones:

- Realiza una solicitud a la API de "restcountries.com" para obtener información sobre todos los países.
- Procesa la respuesta y crea una lista normalizada de nombres de países en español.
- Utiliza la lista de países normalizados para comparar con los países ingresados por el usuario en la función `obtenerDatosClimaticos()`.
- Maneja posibles errores, como problemas con la conexión a la API o errores en el formato de los datos recibidos.

## Sintáxis Javascript

En la implementación en JavaScript, he utilizado la notación de Camel Case para definir el nombre de la función y las variables.

# Comentarios sobre el ejercicio en Python

Para abordar este ejercicio en Python, me basé en la implementación que ya había realizado en JavaScript. Esto me permitió comprender los pasos necesarios y la lógica subyacente para obtener los datos climáticos de países de todo el mundo.

## Archivo .env y .env.example

Además, he agregado un archivo `.env.example` en el que se proporciona una plantilla simple para que agreguen su propia API_KEY proporcionada por OpenWeatherMap. Luego, deben renombrar el archivo `.env.example` a `.env` y agregar su API_KEY en ese archivo.
La API restcountries.com no requiere de API KEY.

## Uso de Librerías

Utilicé las siguientes librerías:

- **requests**: La librería `requests` para realizar solicitudes HTTP a la API de OpenWeatherMap y obtener los datos climáticos de la ciudad.

- **dotenv**: La librería `dotenv` me permitió cargar variables de entorno desde el archivo `.env`, lo que facilitó la protección y configuración de mi API_KEY de manera segura.

- **unidecode**: La librería `unidecode` para transformar el texto de entrada en un formato sin caracteres diacríticos, asegurando una comparación y procesamiento más uniforme

## Sintaxis Python

En la implementación en Python, he utilizado la notación de Snake Case para definir el nombre de la función y las variables.

# Aclaraciones generales

## Los Campos Temp, Temp_min y Temp_max

Es importante mencionar que en algunos casos, la API devuelve el mismo valor para los campos `temp`, `temp_min` y `temp_max` en ciertos países.

## Datos que devuelve la API

En ambas implementaciones, ya sea en Python o en JavaScript, la API no reconoce algunos países, como por ejemplo, "República Dominicana" o "Emiratos Árabes Unidos", entre otros. Me aseguré de que esta falta de reconocimiento no se debiera a caracteres especiales, como tildes, mayúsculas, espacios ni a la estructura de países compuestos por más de una palabra.

## Fuentes:

- API OpenWeatherMap: https://openweathermap.org/api
- API restcountries.com: https://restcountries.com/
- Librería `requests` para Python: https://docs.python-requests.org/en/master/
- Librería `dotenv` para Python: https://pypi.org/project/python-dotenv/
- Librería `unidecode` para Python: https://pypi.org/project/Unidecode/

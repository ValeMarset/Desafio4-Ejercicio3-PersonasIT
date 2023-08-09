// Esta función obtiene una lista de nombres de países en español utilizando la API "restcountries.com" y retorna una lista normalizada.
async function obtenerListaPaises() {
  try {
    // Realizar una solicitud a la API para obtener la información de los países
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    // Crear una lista de nombres de países normalizados en minúsculas
    const listaPaises = data.map((pais) =>
      pais.translations.spa.common //Acceder al campo en español
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

    // Retorna la lista de nombres de países
    return listaPaises;
  } catch (error) {
    // En caso de error, mostrar un mensaje de error en la consola
    return console.error("Error al obtener la lista de países", error);
  }
}

// const API_KEY = "Inserte aquí su Api key personal e intransferible y descomente esta línea de código"

// Esta función obtiene datos climáticos utilizando la API "OpenWeatherMap"
async function obtenerDatosClimaticos() {
  try {
    // Obtener la lista de países ingresada por el usuario desde un campo de entrada HTML
    const paisesInput = document.getElementById("paises").value;

    // Dividir la entrada en una lista de países y normalizar los nombres
    const paises = paisesInput
      .split(",") // Separar por comas en caso de varios países o un país con varias palabras
      .map(
        (pais) =>
          pais
            .trim() //Elimina espacios al inicio y al final
            .toLowerCase() //Lo convierte en minúscula
            .normalize("NFD") // Normalizar caracteres Unicode
            .replace(/[\u0300-\u036f]/g, "") // Eliminar diacríticos
      );

    // Obtener la lista completa de nombres de países
    const listaPaises = await obtenerListaPaises();

    // Filtrar las palabras que no coinciden con los nombres de países
    const palabrasNoCoincidentes = paises.filter(
      //Devolver un nuevo array con las palabras que no coinciden con paises
      (pais) => !listaPaises.includes(pais)
    );

    // Si hay palabras que no coinciden, mostrar un mensaje de advertencia
    if (palabrasNoCoincidentes.length > 0) {
      let advertenciaError = document.getElementById("advertenciaError");
      advertenciaError.insertAdjacentHTML(
        "afterbegin",
        `La/s palabra/s ingresada/s: <strong>${palabrasNoCoincidentes}</strong> no coincide con un país, por favor intentelo nuevamente.`
      );

      // Mostrar mensaje en la consola
      console.warn(
        "No se ha encontrado el/los pais/es ingresado/s, por favor, intente nuevamente"
      );

      // Limpiar el mensaje de advertencia después de 5 segundos
      setTimeout(() => {
        advertenciaError.innerHTML = "";
      }, 5000);
      return;
    }

    // Obtener los datos climáticos para cada país
    for (const pais of paises) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lang=es&q=${pais}&appid=${API_KEY}&units=metric`;

      // Realizar una solicitud a la API para obtener la información cada país
      const response = await fetch(URL);
      if (!response.ok)
        throw new Error(`Error en la respuesta de la API: ${response.status}`);

      const data = await response.json();

      // Mostrar los datos climáticos en la sección correspondiente de la página
      let datosClimaticosSection = document.getElementById("datosClimaticos");
      datosClimaticosSection.insertAdjacentHTML(
        "afterbegin",
        `
      <ul>
        <li>Ubicación: ${data.name}</li>
        <li>Descripción del clima: ${data.weather[0].description}</li>
        <li>Temperatura: ${data.main.temp} Cº</li>
        <li>Temperatura mínima: ${data.main.temp_min} Cº</li>
        <li>Temperatura máxima: ${data.main.temp_max} Cº</li>
      </ul>
      `
      );

      // Mostrar los datos en la consola
      console.log(
        `
              Ubicación: ${data.name},
              Descripción del clima: ${data.weather[0].description},
              Temperatura: ${data.main.temp} Cº,
              Temperatura mínima: ${data.main.temp_min} Cº,
              Temperatura máxima: ${data.main.temp_max} Cº
             `
      );
    }
  } catch (error) {
    // En caso de error, mostrar un mensaje de advertencia en la página y en la consola
    let advertenciaError = document.getElementById("advertenciaError");
    advertenciaError.insertAdjacentHTML(
      "afterbegin",
      `Se produjo un error al obtener los datos de la API. Por favor, asegúrese de que su API KEY esté configurada correctamente e intente nuevamente. Si el error persiste, es posible que este país no esté disponible en la API OpenWeatherMap.`
    );
    console.warn(
      "Se produjo un error al obtener los datos de la API. Por favor, asegúrese de que su API KEY esté configurada correctamente e intente nuevamente. Si el error persiste, es posible que este país no esté disponible en la API OpenWeatherMap.",
      error
    );
  }
}

async function obtenerListaPaises() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const listaPaises = data.map((pais) =>
      pais.name.common.trim().toLowerCase()
    );
    return listaPaises;
  } catch (error) {
    return console.error("Error al obtener la lista de países", error);
  }
}

// const API_KEY = "Inserte aquí su Api key personal e intransferible y descomente esta línea de código"

async function obtenerDatosClimaticos() {
  try {
    const paisesInput = document.getElementById("paises").value;
    const paises = paisesInput
      .split(",") // lo separo por comas por si llega a haber un pais con varias palabras
      .map((pais) => pais.trim().toLowerCase());

    const listaPaises = await obtenerListaPaises();

    const palabrasNoCoincidentes = paises.filter(
      //me devuelve un nuevo array con las palabras que no coinciden con paises
      (pais) => !listaPaises.includes(pais)
    );

    if (palabrasNoCoincidentes.length > 0) {
      let advertenciaError = document.getElementById("advertenciaError");
      advertenciaError.insertAdjacentHTML(
        "afterbegin",
        `La/s palabra/s ingresada/s: <strong>${palabrasNoCoincidentes}</strong> no coincide con un país, por favor intentelo nuevamente.`
      );

      console.warn(
        "No se ha encontrado el/los pais/es ingresado/s, por favor, intente nuevamente"
      );

      setTimeout(() => {
        advertenciaError.innerHTML = "";
      }, 5000);
      return;
    }

    for (const pais of paises) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lang=es&q=${pais}&appid=${API_KEY}&units=metric`;

      const response = await fetch(URL);
      if (!response.ok)
        throw new Error(`Error en la respuesta de la API: ${response.status}`);
      const data = await response.json();
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
    let advertenciaError = document.getElementById("advertenciaError");
    advertenciaError.insertAdjacentHTML(
      "afterbegin",
      `No se ha encontrado el o los paises ingresados`
    );
    console.error("No se ha encontrado el o los paises ingresados", error);
  }
}

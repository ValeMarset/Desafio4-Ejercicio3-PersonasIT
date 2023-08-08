// Usando la API del ejercicio anterior. Construye un script que reciba un país o de una lista de países y retorne temperatura actual, la mínima y la máxima, y ​​la descripción del clima para cada país solicitado. Hacerlo en español.📝

// const API_KEY = "Inserte aquí su Api key personal e intransferible y descomente esta línea de código"

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

async function obtener_datos_climaticos() {
  try {
    const paisesInput = document.getElementById("paises").value;
    const paises = paisesInput
      .split(",")
      .map((pais) => pais.trim().toLowerCase());

    const listaPaises = await obtenerListaPaises();

    const paisesNoCoincidentes = paises.filter(
      (pais) => !listaPaises.includes(pais)
    );

    console.log("Paises ingresados:", paises);
    console.log("Lista de paises:", listaPaises);
    console.log("Paises no coincidentes:", paisesNoCoincidentes);

    if (paisesNoCoincidentes.length > 0) {
      let advertenciaError = document.getElementById("advertenciaError");
      advertenciaError.insertAdjacentHTML(
        "afterbegin",
        `La/s palabra/s ingresada/s: <strong>${paisesNoCoincidentes}</strong> no coincide con un país, por favor intentelo nuevamente.`
      );

      console.warn(
        "No se ha encontrado el/los pais/es ingresado/s, por favor, intente nuevamente"
      );

      setTimeout(() => {
        advertenciaError.innerHTML = ""; // Elimina el contenido de la sección
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

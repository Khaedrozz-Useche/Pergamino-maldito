const stations = [
  {
    // 1 - Caligrafía (Título narrativo)
    title: "El Manuscrito de las Letras Perdidas",
    description: `
      Los viajeros reciben un manuscrito antiguo digital con símbolos extraños, casi ilegibles.  
      Deben descifrar y escribir las letras correctas en los espacios según el pictograma.
      Al resolverlo, se revela la primera frase del pergamino.
    `,
    challengeType: "input", // escribir palabra clave
    challengeAnswer: "El tiempo no avanza: se dobla, se rompe, se esconde.",
    keyWord: "El tiempo no avanza: se dobla, se rompe, se esconde.",
    showPunctuation: true,
    hintNext:
      '“Quien enfrenta la espada sin miedo y defiende el hogar, revelará los secretos del tiempo. Ysangrim y Danel vigilan, no dejarán pasar a enemigos.”',
  },

  {
    // 2 - Combate
    title: "El Duelo del Guardián",
    description: `
      Enfréntate a Ysangrim o Danel en combate.  
      El escudero evaluará tu estilo y te asignará un animal: Águila, Lobo o Serpiente.  
      Selecciona el animal correcto para desbloquear la frase secreta.
    `,
    challengeType: "choices",
    choices: ["Águila", "Lobo", "Serpiente"],
    correctChoice: "Águila", // Definir aquí la respuesta correcta o el dato para desbloquear (asumiendo Águila)
    // Esto puede personalizarse para cada usuario si quieres.
    keyWord: "Solo aquel que alza la espada sin rencor abre el umbral dormido.",
    showPunctuation: true,
    hintNext: '“La precisión y la calma son la llave que debes buscar. Dirígete a la arquería.”',
  },

  {
    // 3 - Arquería
    title: "El Arte del Tiro y la Paciencia",
    description: `
      El aldeano te pide disparar dos flechas para demostrar tu pulso y paciencia, cualidades esenciales para el viaje en el tiempo.  
      Después, recibirás la palabra secreta para ingresar y desbloquear la siguiente frase.
    `,
    challengeType: "input",
    challengeAnswer: "Paciencia",
    keyWord: "Paciencia",
    showPunctuation: false,
    cryptogram:
      "El futuro no se cambia solo se intuye como la flecha en el viento del tiempo.",
    hintNext:
      "Así como la flecha elige el viento, el viajero debe dejar que el alma elija su acero. La vieja armería espera.",
  },

  {
    // 4 - Armería
    title: "El Juramento del Alma y el Acero",
    description: `
      Elige el arma o casco que más te llame la atención.  
      Si quieres, tómate una foto con tu elección para recordar el momento antes del viaje.  
      Independientemente, recibirás la palabra clave para avanzar.
    `,
    challengeType: "choicePhoto",
    choices: ["Espada Antigua", "Casco de Hierro", "Escudo Forjado"],
    keyWord: "Protección",
    showPunctuation: false,
    cryptogram:
      "Porta lo que tu alma elija pues te acompañará en tu largo viaje.",
    hintNext: '“Antes de partir, deberías reír una vez más. ¡Un juego no hace daño a nadie!”',
  },

  {
    // 5 - Juegos Medievales
    title: "La Risa y el Descanso del Viajero",
    description: `
      Prueba un juego medieval, aprende sus reglas o tómate una foto en el cepo.  
      Al hacerlo, recibirás la palabra clave para desbloquear la siguiente frase.
    `,
    challengeType: "input",
    challengeAnswer: "Descanso",
    keyWord: "Descanso",
    showPunctuation: false,
    cryptogram:
      "Juega ríe falla todo esto quedará atrás cuando cruces el portal.",
    hintNext:
      "Cuidado, viajero… hay quien ya cruzó el portal y no recuerdan su nombre. Los ladrones tal vez puedan ayudarte.",
  },

  {
    // 6 - Oscuridad (Prueba del Olvido)
    title: "El Portal del Olvido",
    description: `
      Dos ladrones robaron un pergamino brillante y abrieron un portal que atrapó la aldea en el tiempo, borrando sus recuerdos.  
      Cruzarás una serie de obstáculos con los ojos vendados para recuperar tu identidad.
    `,
    challengeType: "input",
    challengeAnswer: "Olvido",
    keyWord: "Olvido",
    showPunctuation: false,
    cryptogram:
      "Quien busca en el tiempo debe perder lo que es para encontrarse donde no es.",
    hintNext: null,
  },
];

let currentStation = 0;
let collectedPhrases = [];

const container = document.getElementById("station-container");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function cleanPunctuation(text) {
  // Elimina signos de puntuación para comparación
  return text.toLowerCase().replace(/[.,:;¡!¿?"'…]/g, "").trim();
}

function renderStation() {
  const station = stations[currentStation];
  container.innerHTML = "";

  // Título
  const titleEl = document.createElement("h2");
  titleEl.classList.add("station-title");
  titleEl.textContent = station.title;
  container.appendChild(titleEl);

  // Descripción
  const descEl = document.createElement("p");
  descEl.classList.add("station-description");
  descEl.innerHTML = station.description;
  container.appendChild(descEl);

  // Si ya se recolectó la frase, mostrar criptograma
  const phraseIndex = collectedPhrases.findIndex(
    (p) => p.station === currentStation
  );

  // Mostrar desafío o frase según el estado
  if (phraseIndex !== -1) {
    // Frase desbloqueada - mostrar criptograma y pista siguiente
    const cryptogramEl = document.createElement("div");
    cryptogramEl.classList.add("cryptogram");
    cryptogramEl.textContent = stations[currentStation].challengeAnswer;

    container.appendChild(cryptogramEl);

    if (station.hintNext) {
      const hintEl = document.createElement("p");
      hintEl.classList.add("station-description");
      hintEl.style.marginTop = "1rem";
      hintEl.style.fontStyle = "italic";
      hintEl.textContent = "Pista para la siguiente etapa: " + station.hintNext;
      container.appendChild(hintEl);
    }
  } else {
    // Mostrar desafío interactivo según tipo

    switch (station.challengeType) {
      case "input":
        renderInputChallenge(station);
        break;
      case "choices":
        renderChoiceChallenge(station);
        break;
      case "choicePhoto":
        renderChoicePhotoChallenge(station);
        break;
      default:
        container.innerHTML += "<p>Desafío no definido.</p>";
    }
  }

  // Controlar botones navegación
  prevBtn.disabled = currentStation === 0;
  nextBtn.disabled = phraseIndex === -1;
}

function renderInputChallenge(station) {
  // Instrucción
  const label = document.createElement("label");
  label.textContent = "Ingrese la palabra o frase secreta:";
  label.style.display = "block";
  label.style.marginBottom = "0.5rem";
  container.appendChild(label);

  // Input texto
  const input = document.createElement("input");
  input.type = "text";
  input.id = "secretInput";
  input.autocomplete = "off";
  input.spellcheck = false;
  container.appendChild(input);

  // Botón


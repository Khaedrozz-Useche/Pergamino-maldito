const estaciones = [
  {
    titulo: "Fragmentos del Manuscrito",
    clave: "",
    desafio: "Descifra el manuscrito antiguo con símbolos distorsionados. Escribe las letras correctas en su lugar.",
    criptograma: "El tiempo no avanza se dobla se rompe se esconde",
    pista: "Quien enfrenta la espada sin miedo y defiende el hogar, revelará los secretos del tiempo. Ysangrim y Danel vigilan.",
  },
  {
    titulo: "El Juicio del Combate",
    clave: "Aguila Lobo Serpiente",
    desafio: "Enfréntate a Ysangrim o Danel. El escudero dirá qué animal representa tu forma de pelear. Elígelo.",
    criptograma: "Solo aquel que alza la espada sin rencor abre el umbral dormido",
    pista: "La precisión y la calma son la llave que debes buscar. Dirígete a la arquería.",
  },
  {
    titulo: "El Arte del Pulso",
    clave: "Paciencia",
    desafio: "Dispara dos flechas para demostrar tu control. El aldeano dirá la palabra clave tras tu intento.",
    criptograma: "El futuro no se cambia solo se intuye como la flecha en el viento del tiempo",
    pista: "Así como la flecha elige el viento, el viajero debe dejar que el alma elija su acero.",
  },
  {
    titulo: "Armas del Alma",
    clave: "Protección",
    desafio: "Elige el arma o casco que más resuene contigo. Al alzarlo o tomarte una foto, la aldeana revelará la clave.",
    criptograma: "Porta lo que tu alma elija pues te acompañará en tu largo viaje",
    pista: "Antes de partir, deberías reír una vez más. ¡Un juego no hace daño a nadie!",
  },
  {
    titulo: "Risas antes del Portal",
    clave: "Descanso",
    desafio: "Prueba un juego medieval, escucha las reglas o tómate una foto en el cepo. Obtendrás la clave.",
    criptograma: "Juega ríe falla todo esto quedará atrás cuando cruces el portal",
    pista: "Cuidado, viajero… hay quien ya cruzó el portal y no recuerda su nombre.",
  },
  {
    titulo: "La Prueba del Olvido",
    clave: "Olvido",
    desafio: "Cruza los obstáculos vendado. Solo así recibirás la clave para liberar la última frase.",
    criptograma: "Quien busca en el tiempo debe perder lo que es para encontrarse donde no es",
    pista: "Has llegado al final. Une los fragmentos del tiempo. Es hora de despertar.",
  }
];

let frases = [];

function renderEstaciones() {
  const contenedor = document.getElementById("estaciones");
  estaciones.forEach((estacion, index) => {
    const div = document.createElement("div");
    div.className = "estacion";

    const titulo = document.createElement("h2");
    titulo.textContent = `${estacion.titulo}`;
    div.appendChild(titulo);

    const desc = document.createElement("p");
    desc.textContent = estacion.desafio;
    div.appendChild(desc);

    const input = document.createElement("input");
    input.placeholder = "Ingresa la palabra clave o elige el símbolo";
    div.appendChild(input);

    const btn = document.createElement("button");
    btn.textContent = "Desbloquear frase";
    btn.onclick = () => verificarClave(index, input.value.trim(), div);
    div.appendChild(btn);

    contenedor.appendChild(div);
  });
}

function verificarClave(index, valor, contenedor) {
  const estacion = estaciones[index];
  const claves = estacion.clave.toLowerCase().split(" ");
  if (estacion.clave === "" || claves.includes(valor.toLowerCase())) {
    const frase = document.createElement("p");
    frase.innerHTML = `🌀 <strong>Frase:</strong> ${estacion.criptograma}`;
    frases.push(estacion.criptograma);
    const pista = document.createElement("p");
    pista.innerHTML = `<strong>Pista:</strong> ${estacion.pista}`;
    contenedor.appendChild(frase);
    contenedor.appendChild(pista);
    contenedor.querySelector("input").disabled = true;
    contenedor.querySelector("button").disabled = true;
    revisarFinal();
  } else {
    alert("Palabra clave incorrecta. Intenta otra vez o consulta al aldeano.");
  }
}

function revisarFinal() {
  if (frases.length === estaciones.length) {
    document.getElementById("final").classList.remove("hidden");
    document.getElementById("pergaminoCompleto").textContent = frases.join(" ");
  }
}

renderEstaciones();

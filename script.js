const app = document.getElementById('app');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const estaciones = [
  {
    titulo: "Bienvenida al viaje en el tiempo",
    texto: `El tiempo es un río que no siempre fluye hacia adelante. Hoy, tendrás la oportunidad de recorrer sus márgenes, doblarlo, entenderlo… y tal vez, regresar.`,
    boton: "Continuar",
  },
  {
    titulo: "Caligrafía ancestral",
    descripcion: `
    <p>Recibes un manuscrito antiguo digital con símbolos deformados. Debes arrastrar o seleccionar las letras correctas en los espacios según los pictogramas.</p>
    <p><strong>Frase desbloqueada:</strong> <br>🌀 "El tiempo no avanza: se dobla, se rompe, se esconde."</p>
    <p><em>Pista para continuar:</em> “Quien enfrenta la espada sin miedo y defiende el hogar, revelará los secretos del tiempo. Ysangrim y Danel vigilan, no dejarán pasar a enemigos.”</p>
    `,
    boton: "Ir a la espada y el escudero"
  },
  {
    titulo: "El enfrentamiento con Ysangrim y Danel",
    descripcion: `
    <p>El escudero te asigna un animal que representa tu forma de pelear: Águila, Lobo o Serpiente.</p>
    <p>Selecciona el animal que te indica el escudero para desbloquear la siguiente frase.</p>
    <div class="center-text">
      <button onclick="seleccionarAnimal('Aguila')">Águila</button>
      <button onclick="seleccionarAnimal('Lobo')">Lobo</button>
      <button onclick="seleccionarAnimal('Serpiente')">Serpiente</button>
    </div>
    <div id="mensajeAnimal" style="margin-top:15px; font-weight:bold;"></div>
    `,
    boton: "Ir a la arquería",
    esperaRespuesta: true,
  },
  {
    titulo: "El arte del arco y la paciencia",
    descripcion: `
    <p>Dispara dos flechas para demostrar tu pulso y paciencia. Luego ingresa la palabra secreta que el aldeano te da.</p>
    <input type="text" id="inputPaciencia" placeholder="Ingresa la palabra clave" />
    <button onclick="validarPalabra('inputPaciencia', 'paciencia')">Verificar palabra</button>
    <div id="mensajePaciencia" style="margin-top:15px; font-weight:bold;"></div>
    `,
    boton: "Ir a la armería",
    esperaRespuesta: true,
  },
  {
    titulo: "Elección del arma y la protección",
    descripcion: `
    <p>Elige un arma o casco y si quieres, tómate una foto para recordar el viaje.</p>
    <p>Recuerda la palabra clave: Protección</p>
    <input type="text" id="inputProteccion" placeholder="Ingresa la palabra clave" />
    <button onclick="validarPalabra('inputProteccion', 'protección')">Verificar palabra</button>
    <div id="mensajeProteccion" style="margin-top:15px; font-weight:bold;"></div>
    `,
    boton: "Ir a los juegos",
    esperaRespuesta: true,
  },
  {
    titulo: "Risas y juegos medievales",
    descripcion: `
    <p>Prueba un juego, escucha las reglas o tómate una foto en el cepo.</p>
    <p>Palabra clave: Descanso</p>
    <input type="text" id="inputDescanso" placeholder="Ingresa la palabra clave" />
    <button onclick="validarPalabra('inputDescanso', 'descanso')">Verificar palabra</button>
    <div id="mensajeDescanso" style="margin-top:15px; font-weight:bold;"></div>
    `,
    boton: "Ir a la oscuridad",
    esperaRespuesta: true,
  },
  {
    titulo: "La prueba del olvido",
    descripcion: `
    <p>Con los ojos vendados, atraviesa la oscuridad y recupera la palabra clave.</p>
    <p>Palabra clave: Olvido</p>
    <input type="text" id="inputOlvido" placeholder="Ingresa la palabra clave" />
    <button onclick="validarPalabra('inputOlvido', 'olvido')">Verificar palabra</button>
    <div id="mensajeOlvido" style="margin-top:15px; font-weight:bold;"></div>
    `,
    boton: "Ver pergamino completo",
    esperaRespuesta: true,
  },
  {
    titulo: "El pergamino restaurado",
    descripcion: `
    <p>El pergamino ha sido restaurado. Los aldeanos deben reunirse a medianoche y leerlo en voz alta para que el tiempo vuelva a fluir.</p>
    <p><strong>Frases desbloqueadas:</strong></p>
    <ol>
      <li>🌀 "El tiempo no avanza: se dobla, se rompe, se esconde."</li>
      <li>🌀 “Solo aquel que alza la espada sin rencor abre el umbral dormido.”</li>
      <li>🏹 “El futuro no se cambia, solo se intuye, como la flecha en el viento del tiempo.”</li>
      <li>🛡️ "Porta lo que tu alma elija, pues te acompañará en tu largo viaje."</li>
      <li>🎲 "Juega, ríe, falla: todo esto quedará atrás cuando cruces el portal."</li>
      <li>👁️ “Quien busca en el tiempo, debe perder lo que es, para encontrarse donde no es.”</li>
    </ol>
    `,
    boton: "Finalizar aventura",
  }
];

let indice = 0;
let animalesCorrectos = ['aguila', 'lobo', 'serpiente']; // para validar
let respuestaCorrecta = false;

// Función para cargar la estación actual
function cargarEstacion() {
  const estacion = estaciones[indice];
  app.innerHTML = '';

  // Mostrar título
  const titulo = document.createElement('h1');
  titulo.textContent = estacion.titulo;
  app.appendChild(titulo);

  // Mostrar descripción si existe
  if (estacion.descripcion) {
    const desc = document.createElement('div');
    desc.innerHTML = estacion.descripcion;
    app.appendChild(desc);
  } else {
    const p = document.createElement('p');
    p.textContent = estacion.texto;
    app.appendChild(p);
  }

  // Cambiar texto del botón siguiente
  nextBtn.textContent = estacion.boton;

  // Control de botón anterior
  prevBtn.disabled = indice === 0;

  // Si espera respuesta, deshabilitar botón siguiente hasta que respondan
  if (estacion.esperaRespuesta) {
    nextBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
}

// Funciones auxiliares para validar input y selección

function seleccionarAnimal(animal) {
  const mensaje = document.getElementById('mensajeAnimal');
  if (animal.toLowerCase() === 'lobo') {
    mensaje.textContent = '¡Correcto! Has elegido el espíritu protector del tiempo.';
    respuestaCorrecta = true;
    nextBtn.disabled = false;
  } else {
    mensaje.textContent = 'Esa no es la elección correcta, intenta de nuevo.';
    respuestaCorrecta = false;
    nextBtn.disabled = true;
  }
}

function validarPalabra(inputId, palabraClave) {
  const input = document.getElementById(inputId);
  const mensaje = document.getElementById('mensaje' + palabraClave.charAt(0).toUpperCase() + palabraClave.slice(1));
  if (input.value.trim().toLowerCase() === palabraClave.toLowerCase()) {
    mensaje.textContent = '¡Palabra correcta! Puedes avanzar.';
    respuestaCorrecta = true;
    nextBtn.disabled = false;
  } else {
    mensaje.textContent = 'Palabra incorrecta, inténtalo de nuevo.';
    respuestaCorrecta = false;
    nextBtn.disabled = true;
  }
}

// Eventos botones

nextBtn.addEventListener('click', () => {
  if (estaciones[indice].esperaRespuesta && !respuestaCorrecta) {
    alert('Debes completar la acción correctamente para avanzar.');
    return;
  }
  if (indice < estaciones.length - 1) {
    indice++;
    respuestaCorrecta = false;
    cargarEstacion();
  } else {
    alert('Has finalizado la experiencia. ¡Gracias por participar!');
  }
});

prevBtn.addEventListener('click', () => {
  if (indice > 0) {
    indice--;
    respuestaCorrecta = true; // para permitir avanzar si retrocedes
    cargarEstacion();
  }
});

// Carga inicial
cargarEstacion();

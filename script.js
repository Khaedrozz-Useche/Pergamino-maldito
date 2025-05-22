const stations = {
  1: {
    name: "🖋️ Estación de Caligrafía",
    phrase: "El tiempo no avanza: se dobla, se rompe, se esconde.",
    hint: '“Quien enfrenta la espada sin miedo y defiende el hogar, revelará los secretos del tiempo. Ysangrim y Danel vigilan, no dejarán pasar a enemigos.”',
    interaction: function(next) {
      // El usuario debe resolver un criptograma para desbloquear la frase. 
      // Como no diste el criptograma real, simulamos:
      showMessage(`Debes descifrar la frase en el manuscrito antiguo.\n\nPista: La frase tiene 48 caracteres.\n\nIngresa la frase completa:`);

      createTextInput((input) => {
        if(input.trim().toLowerCase() === this.phrase.toLowerCase()){
          showMessage(`¡Correcto!\nFrase desbloqueada:\n"${this.phrase}"\n\nPista para la siguiente estación:\n${this.hint}`);
          next();
        } else {
          showMessage("No es correcto, intenta de nuevo.");
          this.interaction(next);
        }
      });
    }
  },
  2: {
    name: "⚔️ Estación de Combate",
    phrase: "Solo aquel que alza la espada sin rencor abre el umbral dormido.",
    hint: "La precisión y la calma son la llave que debes buscar. Dirígete a la arquería.",
    interaction: function(next) {
      showMessage(`Debes enfrentarte a Ysangrim o Danel en combate.\n(Esto es simulado)\n\nEscoge a quién enfrentas: Ysangrim / Danel`);

      createTextInput((input) => {
        const enemy = input.trim().toLowerCase();
        if(enemy === "ysangrim" || enemy === "danel"){
          // Simulamos el rol del escudero
          showMessage(`Has derrotado a ${enemy}.\n\nEl escudero observa tu estilo de lucha y te asigna un animal:\nÁguila, Lobo o Serpiente.\n\n¿Cuál eliges?`);

          createTextInput((animal) => {
            const choice = animal.trim().toLowerCase();
            if(["águila", "aguila", "lobo", "serpiente"].includes(choice)){
              showMessage(`Frase desbloqueada:\n"${this.phrase}"\n\nPista para la siguiente estación:\n${this.hint}`);
              next();
            } else {
              showMessage("Animal inválido. Debes elegir: Águila, Lobo o Serpiente.");
              this.interaction(next);
            }
          });
        } else {
          showMessage("Debes elegir entre Ysangrim o Danel.");
          this.interaction(next);
        }
      });
    }
  },
  3: {
    name: "🏹 Estación de Arquería",
    phrase: "El futuro no se cambia, solo se intuye, como la flecha en el viento del tiempo.",
    hint: "Así como la flecha elige el viento, el viajero debe dejar que el alma elija su acero. La vieja armería espera.",
    interaction: function(next) {
      showMessage(`Dispara dos flechas para demostrar tu pulso y paciencia.\n(Simulado)\n\nCuando termines, ingresa la palabra secreta que te dio el aldeano:`);

      createTextInput((word) => {
        if(word.trim().toLowerCase() === "paciencia"){
          showMessage(`Frase desbloqueada:\n"${this.phrase}"\n\nPista para la siguiente estación:\n${this.hint}`);
          next();
        } else {
          showMessage("Palabra incorrecta. Intenta de nuevo.");
          this.interaction(next);
        }
      });
    }
  },
  4: {
    name: "🛡️ Estación de Armería",
    phrase: "Porta lo que tu alma elija, pues te acompañará en tu largo viaje.",
    hint: "Antes de partir, deberías reír una vez más. ¡Un juego no hace daño a nadie!",
    interaction: function(next) {
      showMessage(`Elige el arma o casco que más te guste.\n(Simulado)\n\n¿Quieres tomar una foto con tu elección? (sí/no)`);

      createTextInput((answer) => {
        answer = answer.trim().toLowerCase();
        if(answer === "sí" || answer === "si" || answer === "no"){
          // La aldeana da la palabra "Protección"
          showMessage(`La aldeana te da la palabra clave para desbloquear el criptograma: Protección\n\nFrase desbloqueada:\n"${this.phrase}"\n\nPista para la siguiente estación:\n${this.hint}`);
          next();
        } else {
          showMessage("Por favor responde sí o no.");
          this.interaction(next);
        }
      });
    }
  },
  5: {
    name: "🎲 Estación de Juegos Medievales",
    phrase: "Juega, ríe, falla: todo esto quedará atrás cuando cruces el portal.",
    hint: "Cuidado, viajero… hay quien ya cruzó el portal, y no recuerdan su nombre. Los ladrones tal vez puedan ayudarte.",
    interaction: function(next) {
      showMessage(`Prueba algún juego medieval, escucha cómo se juega o tómate una foto en el cepo.\n(Simulado)\n\nCuando lo hagas, ingresa la palabra clave que te dieron:`);

      createTextInput((word) => {
        if(word.trim().toLowerCase() === "descanso"){
          showMessage(`Frase desbloqueada:\n"${this.phrase}"\n\nPista para la siguiente estación:\n${this.hint}`);
          next();
        } else {
          showMessage("Palabra incorrecta. Intenta de nuevo.");
          this.interaction(next);
        }
      });
    }
  },
  6: {
    name: "👁️ Estación de la Oscuridad",
    phrase: "Quien busca en el tiempo, debe perder lo que es, para encontrarse donde no es.",
    hint: "Este es el cierre. Si tienes las 6 frases, desbloqueas el pergamino completo.",
    interaction: function(next) {
      showMessage(`Debes superar la Prueba del Olvido.\n\nCruza los obstáculos con los ojos vendados.\n\nCuando termines, ingresa la palabra clave:`);

      createTextInput((word) => {
        if(word.trim().toLowerCase() === "olvido"){
          showMessage(`Frase desbloqueada:\n"${this.phrase}"\n\n${this.hint}`);
          next();
        } else {
          showMessage("Palabra incorrecta. Intenta de nuevo.");
          this.interaction(next);
        }
      });
    }
  }
};

const messageEl = document.getElementById("message");
const inputArea = document.getElementById("input-area");
const finalScroll = document.getElementById("final-scroll");

let currentStation = 1;
let unlockedStations = new Set();

function showMessage(text) {
  messageEl.textContent = text;
  inputArea.innerHTML = "";
  hideImageSelection();
}

function createTextInput(callback) {
  inputArea.innerHTML = `
    <input type="text" id="user-input" placeholder="Escribe aquí..." autofocus />
    <button id="submit-btn">Enviar</button>
  `;
  const input = document.getElementById("user-input");
  const btn = document.getElementById("submit-btn");

  btn.onclick = () => {
    const value = input.value;
    callback(value);
  };

  input.addEventListener("keydown", e => {
    if(e.key === "Enter") btn.click();
  });
}

function hideImageSelection() {
  const imgSel = document.getElementById("image-selection");
  imgSel.style.display = "none";
  imgSel.innerHTML = "";
}

function enableNextStation() {
  currentStation++;
  if(currentStation > 6){
    showFinalScroll();
    disableAllStations();
    return;
  }
  document.getElementById(`station${currentStation}`).disabled = false;
  unlockedStations.add(currentStation);
}

function disableAllStations(){
  for(let i=1; i<=6; i++){
    document.getElementById(`station${i}`).disabled = true;
  }
}

function onStationClick(num){
  if(num !== currentStation) {
    alert("Debes seguir el orden de las estaciones.");
    return;
  }

  stations[num].interaction(() => {
    enableNextStation();
  });
}

function init(){
  // Desactivar todas excepto la 1
  for(let i=1; i<=6; i++){
    document.getElementById(`station${i}`).disabled = true;
  }
  document.getElementById("station1").disabled = false;

  // Botones
  for(let i=1; i<=6; i++){
    document.getElementById(`station${i}`).onclick = () => onStationClick(i);
  }

  showMessage("Bienvenido al recorrido. Presiona la Estación 1 para comenzar.");
}

function showFinalScroll(){
  finalScroll.style.display = "block";
  messageEl.textContent = "¡Felicidades! Has desbloqueado todas las frases del pergamino.";
  inputArea.innerHTML = "";
}

init();

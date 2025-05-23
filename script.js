document.addEventListener('DOMContentLoaded', () => {
  const pantallas = document.querySelectorAll('.pantalla');
  const frases = [];
  let palabraSecretaArqueria = 'paciencia';
  let palabraSecretaArmeria = 'Valiente';
  let palabraSecretaJuegos = 'descanso';
  let palabraSecretaOscuridad = 'olvido';

  function mostrarPantalla(id) {
    pantallas.forEach(p => p.classList.remove('activa'));
    document.getElementById(id).classList.add('activa');
  }

  // Inicio
  document.getElementById('btn-iniciar').addEventListener('click', () => {
    mostrarPantalla('caligrafia');
    frases.push('El tiempo no avanza: se dobla, se rompe, se esconde.');
  });

  // Caligrafía
  document.querySelector('#caligrafia .btn-siguiente').addEventListener('click', () => {
    mostrarPantalla('combate');
    frases.push('Solo aquel que alza la espada sin rencor abre el umbral dormido.');
  });

  // Combate - selección animal
  const animalesBtns = document.querySelectorAll('#combate .animal');
  let animalSeleccionado = null;
  animalesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      animalesBtns.forEach(b => b.disabled = false);
      btn.disabled = true;
      animalSeleccionado = btn.dataset.animal;
      document.querySelector('#combate .btn-siguiente').disabled = false;
    });
  });

  document.querySelector('#combate .btn-siguiente').addEventListener('click', () => {
    if (!animalSeleccionado) return;
    mostrarPantalla('arqueria');
    frases.push('La precisión y la calma son la llave que debes buscar. Dirígete a la arquería.');
  });

  // Arquería
  const btnDisparar = document.getElementById('btn-disparar');
  btnDisparar.addEventListener('click', () => {
    btnDisparar.style.display = 'none';
    document.getElementById('input-palabra-arqueria').style.display = 'block';
    document.querySelector('#arqueria .frase').style.display = 'block';
    document.querySelector('#arqueria .pista').style.display = 'block';
  });

  document.getElementById('validar-palabra-arqueria').addEventListener('click', () => {
    const input = document.getElementById('palabra-arqueria');
    if (input.value.trim().toLowerCase() === palabraSecretaArqueria) {
      frases.push('El futuro no se cambia, solo se intuye, como la flecha en el viento del tiempo.');
      mostrarPantalla('armeria');
    } else {
      alert('Palabra incorrecta, intenta de nuevo.');
    }
  });

  // Armería
  const objetos = document.querySelectorAll('#armeria .objeto');
  let objetoSeleccionado = null;

  objetos.forEach(obj => {
    obj.addEventListener('click', () => {
      objetos.forEach(o => o.disabled = false);
      obj.disabled = true;
      objetoSeleccionado = obj.dataset.palabra;
      document.getElementById('input-palabra-armeria').style.display = 'block';
      document.querySelector('#armeria .frase').style.display = 'block';
      document.querySelector('#armeria .pista').style.display = 'block';
    });
  });

  document.getElementById('validar-palabra-armeria').addEventListener('click', () => {
    const input = document.getElementById('palabra-armeria');
    if (input.value.trim().toLowerCase() === palabraSecretaArmeria) {
      frases.push('Porta lo que tu alma elija, pues te acompañará en tu largo viaje.');
      mostrarPantalla('juegos');
    } else {
      alert('Palabra incorrecta, intenta de nuevo.');
    }
  });

  // Juegos
  const btnInteractuarJuegos = document.getElementById('btn-interactuar-juegos');
  btnInteractuarJuegos.addEventListener('click', () => {
    btnInteractuarJuegos.style.display = 'none';
    document.getElementById('input-palabra-juegos').style.display = 'block';
    document.querySelector('#juegos .frase').style.display = 'block';
    document.querySelector('#juegos .pista').style.display = 'block';
  });

  document.getElementById('validar-palabra-juegos').addEventListener('click', () => {
    const input = document.getElementById('palabra-juegos');
    if (input.value.trim().toLowerCase() === palabraSecretaJuegos) {
      frases.push('Juega, ríe, falla: todo esto quedará atrás cuando cruces el portal.');
      mostrarPantalla('oscuridad');
    } else {
      alert('Palabra incorrecta, intenta de nuevo.');
    }
  });

  // Oscuridad
  const btnOlvido = document.getElementById('btn-olvido');
  btnOlvido.addEventListener('click', () => {
    btnOlvido.style.display = 'none';
    document.getElementById('input-palabra-oscuridad').style.display = 'block';
    document.querySelector('#oscuridad .frase').style.display = 'block';
  });

  document.getElementById('validar-palabra-oscuridad').addEventListener('click', () => {
    const input = document.getElementById('palabra-oscuridad');
    if (input.value.trim().toLowerCase() === palabraSecretaOscuridad) {
      frases.push('Quien busca en el tiempo, debe perder lo que es, para encontrarse donde no es.');
      mostrarPantalla('final');
      mostrarPergamino();
    } else {
      alert('Palabra incorrecta, intenta de nuevo.');
    }
  });

  // Final
  function mostrarPergamino() {
    const pergaminoDiv = document.getElementById('pergamino-final');
    pergaminoDiv.innerHTML = '';
    frases.forEach((frase, i) => {
      const p = document.createElement('p');
      p.textContent = `${i + 1}. ${frase}`;
      pergaminoDiv.appendChild(p);
    });
  }

  document.getElementById('guardar').addEventListener('click', () => {
    alert('Función de guardar no implementada en este demo.');
  });

  document.getElementById('finalizar').addEventListener('click', () => {
    alert('Gracias por viajar en el tiempo con nosotros. ¡Hasta la próxima!');
    location.reload();
  });
});

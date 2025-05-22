function responder(opcion) {
  const resultado = document.getElementById("resultado");
  if (opcion === 'leer') {
    resultado.innerHTML = "Una voz susurra en tu mente: 'Has liberado al Hambre de los Antiguos...'. Sientes cómo tu alma se fragmenta.";
  } else if (opcion === 'quemar') {
    resultado.innerHTML = "El fuego consume el pergamino y las runas se disuelven en el aire. Una sensación de alivio te invade. Has contenido el mal.";
  } else {
    resultado.innerHTML = "Guardas el pergamino en tu bolsa. Tal vez un mago o sacerdote pueda descifrarlo más adelante.";
  }
}

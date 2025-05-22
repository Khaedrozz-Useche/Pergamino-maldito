const stations = {
    'paciencia': '🏹 “El futuro no se cambia, solo se intuye, como la flecha en el viento del tiempo.”',
    'protección': '🛡️ "Porta lo que tu alma elija, pues te acompañará en tu largo viaje."',
    'descanso': '🎲 "Juega, ríe, falla: todo esto quedará atrás cuando cruces el portal."',
    'olvido': '👁️ “Quien busca en el tiempo, debe perder lo que es, para encontrarse donde no es.”',
    'águila': '🌀 “Solo aquel que alza la espada sin rencor abre el umbral dormido.”',
    'lobo': '🌀 “Solo aquel que alza la espada sin rencor abre el umbral dormido.”',
    'serpiente': '🌀 “Solo aquel que alza la espada sin rencor abre el umbral dormido.”',
    'manuscrito': '🌀 "El tiempo no avanza: se dobla, se rompe, se esconde."'
};

function checkCode() {
    const code = document.getElementById("codeInput").value.toLowerCase().trim();
    const output = document.getElementById("output");
    if (stations[code]) {
        output.innerText = stations[code];
    } else {
        output.innerText = "Palabra clave incorrecta. Intenta nuevamente.";
    }
}
"""

# Save files
with open(os.path.join(base_path, "index.html"), "w", encoding="utf-8") as f:
    f.write(index_html)
with open(os.path.join(base_path, "style.css"), "w", encoding="utf-8") as f:
    f.write(style_css)
with open(os.path.join(base_path, "script.js"), "w", encoding="utf-8") as f:
    f.write(script_js)

# Create a ZIP file
zip_path = "/mnt/data/LaFrasePerdidaAppCompleta.zip"
with ZipFile(zip_path, 'w') as zipf:
    for root, _, files in os.walk(base_path):
        for file in files:
            full_path = os.path.join(root, file)
            zipf.write(full_path, os.path.relpath(full_path, base_path))

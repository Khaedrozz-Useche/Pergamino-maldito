const questions = [
    {
        question: "¿Cuál de estas criaturas se oculta bajo la luna llena según la leyenda?",
        options: ["El grifo espectral", "El licántropo del abismo", "El fénix sombrío"],
        answer: 1
    },
    {
        question: "¿Qué palabra rompe el primer sello del pergamino?",
        options: ["Lux", "Umbra", "Ignis"],
        answer: 2
    },
    {
        question: "¿Cuántos anillos contenían los susurros de los antiguos sabios?",
        options: ["Tres", "Cinco", "Siete"],
        answer: 0
    }
];

let currentQuestion = 0;

function renderQuestion() {
    const container = document.getElementById("quiz-container");
    container.innerHTML = "";

    if (currentQuestion >= questions.length) {
        container.innerHTML = "<h2>¡Has roto la maldición! El pergamino se disuelve en cenizas brillantes...</h2>";
        return;
    }

    const q = questions[currentQuestion];
    const questionElem = document.createElement("div");
    questionElem.className = "question";
    questionElem.innerHTML = `<h3>${q.question}</h3>`;

    const optionsElem = document.createElement("div");
    optionsElem.className = "options";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => {
            if (index === q.answer) {
                currentQuestion++;
                renderQuestion();
            } else {
                const fb = document.createElement("div");
                fb.className = "feedback";
                fb.innerText = "Respuesta incorrecta. Inténtalo de nuevo.";
                questionElem.appendChild(fb);
            }
        };
        optionsElem.appendChild(btn);
    });

    container.appendChild(questionElem);
    container.appendChild(optionsElem);
}

window.onload = renderQuestion;

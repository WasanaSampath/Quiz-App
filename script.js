const quest = [
    {
        question: "This is Q1 Answer is 2",
        answers: [
            { text: "Answer 1.1", correct: false },
            { text: "Answer 1.2", correct: true },
            { text: "Answer 1.3", correct: false }
        ]
    },
    {
        question: "This is Q2 Answer is 1",
        answers: [
            { text: "Answer 2.1", correct: true },
            { text: "Answer 2.2", correct: false },
            { text: "Answer 2.3", correct: false }
        ]
    },
    {
        question: "This is Q3 Answer is 3",
        answers: [
            { text: "Answer 3.1", correct: false },
            { text: "Answer 3.2", correct: false },
            { text: "Answer 3.3", correct: true }
        ]
    },
    {
        question: "This is Q4 Answer is 1",
        answers: [
            { text: "Answer 4.1", correct: true },
            { text: "Answer 4.2", correct: false },
            { text: "Answer 4.3", correct: false }
        ]
    }
];

const qElement = document.getElementById("qtag");
const ansbut = document.getElementById("ansbut");
const nxtbutton = document.getElementById("nextbtn");

let currentQIndex = 0;
let score = 0;

function strQ() {
    currentQIndex = 0;
    score = 0;
    nxtbutton.innerHTML = "Next";
    showQ();
}
function showQ() {
    resetState();
    let currentQ = quest[currentQIndex];
    let qNo = currentQIndex + 1;
    qElement.innerHTML = qNo + ". " + currentQ.question;

    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansbut.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns);
    }
    );
}
function resetState() {
    nxtbutton.style.display = "none";
    while (ansbut.firstChild) {
        ansbut.removeChild(ansbut.firstChild);
    }
}
function selectAns(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ansbut.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nxtbutton.style.display = "block";
}
nxtbutton.addEventListener("click", () => {
    if (currentQIndex < quest.length) {
        handleNxtButton();
    } else {
        strQ();
    }
});

function handleNxtButton() {
    currentQIndex++;
    if (currentQIndex < quest.length) {
        showQ();
    } else {
        showScore();
    }
}
function showScore() {
    resetState();
    qElement.innerHTML = `Total Score = ${score} out of ${quest.length}.`;
    nxtbutton.innerHTML = "Play Again";
    nxtbutton.style.display = "block";
}
strQ();
//quest=questions
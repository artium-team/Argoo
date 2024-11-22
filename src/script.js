const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    if (questions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        document.body.style.visibility = "hidden";
    }
});

function startGame() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.classList.add(`btn${index + 1}`);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer() {
    for (button of answerButtonsElement.children) {
        setStatusClass(button, button.dataset.correct);
    }

    console.log(questions.length > currentQuestionIndex + 1);
    nextButton.classList.remove("hide");
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Paris", correct: true },
            { text: "London", correct: false },
            { text: "Rome", correct: false },
            { text: "Berlin", correct: false },
        ],
    },
    {
        question: "Who is the President of the USA?",
        answers: [
            { text: "Barack Obama", correct: false },
            { text: "Joe Biden", correct: true },
            { text: "Donald Trump", correct: false },
            {
                text: "George Bush",
                correct: false,
            },
        ],
    },
];

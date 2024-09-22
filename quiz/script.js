const question = document.querySelector("#question")
const btnAnswer = document.querySelector("#btn-answer")
const btnNext = document.querySelector("#btn-next")
const timerDisplay = document.querySelector("#timer")

const correctColor = "#22c55e";
const incorrectColor = "#ef4444";

const questions = [
    {
        question:"Dünyanın ən hündür zirvəsi hansıdır?",
        answers:[
            {text:"Bazardüzü", correct:"false"},
            {text:"Everest", correct:"true"},
            {text:"Monblan", correct:"false"},
            {text:"Kostyuşko", correct:"false"}
        ]
    },
    {
        question:"Dünyanın ən böyük gölü hansıdır?",
        answers:[
            {text:"Baykal", correct:"false"},
            {text:"Titikaka", correct:"false"},
            {text:"Xəzər", correct:"true"},
            {text:"Urmiya", correct:"false"}
        ]
    },
    {
        question:"Yer kürəsinin hansı qitəsi ən böyüyüdür?",
        answers:[
            {text:"Avropa", correct:"false"},
            {text:"Asiya", correct:"true"},
            {text:"Afrika", correct:"false"},
            {text:"Avstraliya", correct:"false"}
        ]
    },
    {
        question:"Hansı planet Günəş sistemində ən böyükdür?",
        answers:[
            {text:"Venera", correct:"false"},
            {text:"Yupiter", correct:"true"},
            {text:"Yer", correct:"false"},
            {text:"Mars", correct:"false"}
        ]
    },
    {
        question:"Azərbaycan Respublikasının paytaxtı hansıdır?",
        answers:[
            {text:"Naxçıvan", correct:"false"},
            {text:"Gəncə", correct:"false"},
            {text:"Sumqayıt", correct:"false"},
            {text:"Bakı", correct:"true"}
        ]
    }
]

let currentQuestionIndex = 0
let score = 0
let timeLeft = 15
let timer

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function StartQuiz() {
    currentQuestionIndex = 0
    score = 0
    btnNext.innerHTML ='Next'
    shuffle(questions)
    showQuestion()
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    question.innerHTML = `${questionNo}. ${currentQuestion.question}`
    
    const shuffledAnswers = shuffle(currentQuestion.answers)
    for (answer of shuffledAnswers) {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add("btn")
        btnAnswer.appendChild(button)
        if (answer.correct === "true") {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    }
    startTimer()
}

function resetState() {
    btnNext.style.display = "none"
    clearInterval(timer)
    for (; btnAnswer.firstChild;) {
        btnAnswer.removeChild(btnAnswer.firstChild);
    }
}

function selectAnswer(e) {
    clearInterval(timer)
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    selectedBtn.style.background = isCorrect ? correctColor : incorrectColor;
    if (isCorrect) {
        score += 1
    }
   
    for (const button of btnAnswer.children) {
        if (button.dataset.correct === "true") {
            button.style.background = correctColor
        }
        button.disabled = true
    }
    btnNext.style.display = "block"
}

function showScore() {
    resetState()
    question.innerHTML = `You score ${score} out of ${questions.length}!`
    btnNext.innerHTML = "Play Again"
    btnNext.style.display = "block"
    timerDisplay.style.display = "none"
}

function handleBtnNext() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    }
    else {
        showScore()
    }
}

btnNext.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length) {
        handleBtnNext()
    }
    else {
        StartQuiz()
    }
})

function startTimer() {
    timeLeft = 15
    updateTimerDisplay()
    timer = setInterval(() => {
        timeLeft--
        updateTimerDisplay()
        if (timeLeft <= 0) {
            clearInterval(timer)
            handleTimerEnd()
        }
    }, 1000)
}

function updateTimerDisplay() {
    timerDisplay.textContent = `Qalan vaxt: ${timeLeft}`
    if (timeLeft <= 5 && timeLeft !== 0) {
        timerDisplay.classList.add("text-red-500")
    } 
    else if (timeLeft === 0) {
        timerDisplay.textContent = `Vaxt bitti`
    }
    else {
        timerDisplay.classList.remove("text-red-500")
    }
}

function handleTimerEnd() {
    for (const button of btnAnswer.children) {
        if (button.dataset.correct === "true") {
            button.style.background = correctColor
        }
        button.disabled = true
    }
    btnNext.style.display = "block"
}

StartQuiz()


 
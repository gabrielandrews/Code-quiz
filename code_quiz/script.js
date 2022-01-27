const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'do web developers use css?',
        answers: [
            { text: 'all the time', correct: true },
            { text: 'never', correct: false },
            { text: 'as needed', correct: true },
            { text: 'often', correct: true },

        ]
    },
    {
        question: 'What tag is used to define a table or image notation (caption)?',
        answers: [
            { text: 'embed', correct: true },
            { text: 'caption', correct: false },
            { text: 'code', correct: false },
            { text: '!DOCTYPE', correct: false },
        ]
    },
    {
        question: 'What tag is used to specify example of computer code?',
        answers: [
            { text: 'embed', correct: false },
            { text: 'caption', correct: true },
            { text: 'code', correct: false },
            { text: '!DOCTYPE', correct: false },
        ]
    },
    {

        question: 'What tag is used to define an unordered list that is bulleted?',
        answers: [
            { text: 'u', correct: false },
            { text: 'ul', correct: true },
            { text: 's', correct: false },
            { text: 'li', correct: false }
        ]
    }
]
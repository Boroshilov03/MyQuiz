const questions = [
    {
        question: "Who wrote this code?",
        answers:[
            { text: "Mirlan Boroshilov", correct: false},
            { text: "Mirlan Tran Hanh", correct: false},
            { text: "Monkey D. Mirlan!", correct: true},
            { text: "Random Software Developer", correct: false},
        ]
    },
    {
        question: "My favorite anime?",
        answers:[
            { text: "One Piece", correct: true},
            { text: "Jujutsu Kaisen", correct: false},
            { text: "Dr. Stone", correct: false},
            { text: "Darling in the Franxx", correct: false},
        ]
    },
    {
        question: "My favorite color?",
        answers:[
            { text: "Red, Salmon red, Scarlet red, Barn red, Imperial red, Indian red", correct: false},
            { text: "Green!", correct: false},
            { text: "light blue :)", correct: true},
            { text: "Yes!", correct: false},
        ]
    },
    {
        question: "My favorite item?",
        answers:[
            { text: "$2000 Bike that is made of carbon", correct: true},
            { text: "Face Products", correct: false},
            { text: "Really fast car!", correct: false},
            { text: "Laptop/Personal Computer", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();   /* displays question */
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;      /* question # */
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;     /* adds text in button */
        button.classList.add("btn");    /* add btn class name in button */
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;    /* true or false */
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;    /* increase score by 1 */
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
    });
    nextButton.style.display = "block"; /* goes to next question */
}

function showScore() {
    resetState();

    if (score === questions.length) {
        questionElement.innerHTML = `Congratulations!!! 🎉 You scored a perfect ${score} out of ${questions.length}!`;
    }
    else {
        questionElement.innerHTML = `Unfortunately, you scored ${score} out of ${questions.length}...you will get a spanky 🤚`;
    }

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
const questions = [
    {
        question: "Which number should you dial if there is a medical emergency?",
        answers: [
            { text: "119", correct: false },
            { text: "120", correct: true },
            { text: "110", correct: false },
            { text: "911", correct: false },
        ]
    },
    {
        question: "What should you do first if a person is injured in a laboratory?",
        answers: [
            { text: "Move the person to another location immediately", correct: false },
            { text: "Offer the person a beverage to keep them warm", correct: false },
            { text: "Take a photo of the scene for documentation", correct: false },
            { text: "Call for emergency response", correct: true },
        ]
    },
    {
        question: "What is the first step to take if hazardous material is splashed in the eye?",
        answers: [
            { text: "Close your eyes and wait for assistance", correct: false },
            { text: "Immediately rinse eyeball and inner surface of eyelid with water continuously for 15 minutes", correct: true },
            { text: "Apply an eye patch to prevent further contamination", correct: false },
            { text: "Dry the eye with a soft cloth", correct: false },
        ]
    },
    {
        question: "What should you do before clicking on a link or opening an email attachment?",
        answers: [
            { text: "Make sure the sender, subject, and email text are consistent and reasonable", correct: true },
            { text: "Verify the link by entering it directly into your web browser", correct: false },
            { text: "Open all attachments to verify contents quickly", correct: false },
            { text: "Forward the email to colleagues to check its authenticity", correct: false },
        ]
    },
    {
        question: "What are effective measures to protect against social engineering attacks?",
        answers: [
            { text: "Publish all personal details on social networks to maintain transparency", correct: false },
            { text: "Trust emails from unknown senders if they look professional", correct: false },
            { text: "Always share passwords over the phone when requested by a company representative", correct: false },
            { text: "Use social networks responsibly and limit the personal information you share", correct: true },
        ]
    },
    {
        question: "What is one general safety rule that should always be followed in the laboratory?",
        answers: [
            { text: "Wear shorts and open sandals for comfort", correct: false },
            { text: "Perform unauthorized experiments whenever possible", correct: false },
            { text: "Always wear appropriate personal protective equipment (PPE)", correct: true },
            { text: "Dispose of all waste in the nearest trash can", correct: false },
        ]
    },
    {
        question: "What is the meaning of this sign?",
        image: "No_Smoking.png",
        answers: [
            { text: "No open flame", correct: false },
            { text: "No smoking", correct: true },
            { text: "Toxic material", correct: false },
            { text: "First aid", correct: false },
        ]
    },
    {
        question: "What is the meaning of this sign?",
        image: "Ear_Protection.png",
        answers: [
            { text: "Wear ear protection", correct: true },
            { text: "Fire extinguisher", correct: false },
            { text: "Wear protective gloves", correct: false },
            { text: "Explosive material", correct: false },
        ]
    },
    {
        question: "What is the meaning of this sign?",
        image: "Toxic_Sign.png",
        answers: [
            { text: "Toxic material", correct: true },
            { text: "Fire extinguisher", correct: false },
            { text: "Eyewash station", correct: false },
            { text: "Radioactive material", correct: false },
        ]
    },
    {
        question: "What is the meaning of this sign?",
        image: "Emergency_Exit.png",
        answers: [
            { text: "No thoroughfare", correct: false },
            { text: "First aid", correct: false },
            { text: "Emergency exit", correct: true },
            { text: "Fire alarm call point", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    
    // Create a container for the question text and image
    let questionContent = document.createElement("div");
    questionContent.style.display = "flex";
    questionContent.style.alignItems = "center";
    
    // Add question text
    let textNode = document.createTextNode(currentQuestion.question + " ");
    questionContent.appendChild(textNode);
    
    // Add image if it exists
    if (currentQuestion.image) {
        let img = document.createElement("img");
        img.src = currentQuestion.image;
        img.alt = "Question Image";
        img.style.height = "60px";
        img.style.marginLeft = "15px";
        questionContent.appendChild(img);
    }
    
    // Append the question content and progress to the question element
    questionElement.innerHTML = ""; // Clear previous content
    questionElement.appendChild(questionContent);
    questionElement.innerHTML += "<span id='progress'>" + ` ${questionNo}/${questions.length}` + "</span>";

    // Display answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    const downloadButton = document.getElementById("download-btn");
    downloadButton.style.display = "none";  // Verstecke den Download-Button
    downloadButton.removeEventListener("click", downloadCertificate); // Entferne den Event Listener

    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct == "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! <br><br>`; // Fügt eine Leerzeile hinzu

    // Text und Verhalten basierend auf der Punktzahl des Nutzers
    if (score / questions.length >= 0.5) {
        questionElement.innerHTML += "Congratulations! You can download your certificate.";
        const downloadButton = document.getElementById("download-btn");
        downloadButton.style.display = "block";
        downloadButton.addEventListener("click", downloadCertificate);
    } else {
        questionElement.innerHTML += "Try again! If you achieve at least 50%, you can download your certificate.";
    }

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function downloadCertificate() {
    window.location.href = 'Certificate_Quiz_NJU.pdf';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
});

startQuiz();
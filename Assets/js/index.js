
// Global variables
let currentQuestion = 0;
let score = 0;
let questions = [
  {
    question: "What is the correct way to write a JavaScript array?",
    choices: ["var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'"],
    correctAnswer: 2
  },
  {
    question: "What is the correct way to write a JavaScript object?",
    choices: ["var person = (name:'John', age:25)", "var person = 1 = (name:'John', age:25)", "var person = {name:'John', age:25}", "var person = 'name':'John', 'age':25"],
    correctAnswer: 2
  },
  {
    question: "Which of the following is not a reserved word in JavaScript?",
    choices: ["interface", "throws", "program", "short"],
    correctAnswer: 2
  },
];

// Start button event listener
document.getElementById("start-btn").addEventListener("click", startQuiz);

// Timer variables
let timeLeft = 60;
let timerInterval;

// Start quiz function
function startQuiz() {
  // Hide start screen and show quiz screen
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";

  // Start timer
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time-left").innerHTML = timeLeft;
    if (timeLeft === 0) {
      endQuiz();
    }
  }, 1000);

  // Present first question
  presentQuestion();
}

// Present question function
function presentQuestion() {
  // Get current question and choices
  let question = questions[currentQuestion].question;
  let choices = questions[currentQuestion].choices;

  // Display question and choices
  document.getElementById("question").innerHTML = question;
  let choiceHTML = "";
  for (let i = 0; i < choices.length; i++) {
    choiceHTML += `<input type="radio" name="choice" value="${i}"> ${choices[i]} <br>`;
  }
  document.getElementById("choices").innerHTML = choiceHTML;

  // Show submit button
  document.getElementById("submit-btn").style.display = "block";

  // Submit button event listener
  document.getElementById("submit-btn").addEventListener("click", checkAnswer);
}

// Check answer function
function checkAnswer() {
  // Get selected answer
  let selectedAnswer = document.querySelector("input[name='choice']:checked").value;

  // Check if answer is correct
  if (selectedAnswer == questions[currentQuestion].correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }

    // Move to next question or end quiz if all questions have been answered
    currentQuestion++;
    if (currentQuestion < questions.length) {
      presentQuestion();
    } else {
      endQuiz();
    }
  }
  
  // End quiz function
  function endQuiz() {
    // Stop timer
    clearInterval(timerInterval);
  
    // Hide quiz screen and show end screen
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
  
    // Display final score
    document.getElementById("final-score").innerHTML = `Your final score is: ${score}`;
  
    // Save button event listener
    document.getElementById("save-btn").addEventListener("click", saveScore);
  }
  
  // Save score function
  function saveScore() {
    // Get player's initials
    let initials = document.getElementById("initials").value;
  
    // Save score and initials to local storage
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({initials: initials, score: score});
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    // Redirect to high scores page
    window.location.href = "highscores.html";
  }
  
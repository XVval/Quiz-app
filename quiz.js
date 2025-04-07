document.addEventListener("DOMContentLoaded", function () {
  const questions = [
    {
      question: "What is a regular expression in Javascript?",
      answers: [
        "A method that describes a pattern of characters.",
        "A built-in Javascript method.",
        "A data type that represents sequences of characters.",
        "A syntax and string pattern for searching, matching, and replacing text.",
      ],
      correct: 3,
      feedback:
        "A regular expression in a sequence of characters that forms a search",
    },
  ];

  //track which question the user is currently viewing
  let currentQuestion = 0;

  //tracking how many questions the user has answered correctly
  let score = 0;

  //will store the timer interval reference
  let countdown;

  //set time limit for each question (in seconds)
  let timeLeft = 30;

  //flag to prevent multiple answer selection
  let answerSelected = false;

  //labels for multiple choice answers
  const labels = ["a", "b", "c", "d"];

  function displayQuestion() {
    answerSelected = false;

    document.getElementById("feedback").style.display = "none";

    document.getElementById("progress").textContent = `Question ${
      currentQuestion + 1
    } of ${questions.length}`;

    document.getElementById("next-button").style.display = "none";

    //reset and start the timer

    clearInterval(countdown);
    timeLeft = 30;
    timer();

    const questionObj = questions[currentQuestion];

    document.getElementById("question").textContent = `${
      currentQuestion + 1
    }. ${questionObj.question}`;

    const answersU1 = document.getElementById("answers");
    answersU1.innerHTML = "";

    //loop through each answ choice
    questionObj.answers.forEach((answer, index) => {
      //create  a new list item for this answer
      const li = document.createElement("li");

      //create label (a, b, c, or d)

      const labelSpan = document.createElement("span");
      labelSpan.className = "answer-label";
      labelSpan.textContent = labels[index] + ")";

      //add the label an answer text to the list item
      li.appendChild(labelSpan);
      li.appendChild(document.createTextNode(" " + answer));

      //add click handler to check if this answer is correct
      li.onclick = () => {
        if (!answerSelected) {
          checkAnswer(index);
        }
      };

      //add this answer to the list
      answersU1.appendChild(li);
    });
  }

  function timer() {
    document.getElementById(
      "timer"
    ).textContent = `Time remaining: ${timeLeft} seconds`;

    countdown = setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval(countdown);

        checkAnswer(-1);
      } else {
        timeLeft--;
        document.getElementById(
          "timer"
        ).textContent = `Time remaining: ${timeLeft} seconds`;
      }
    }, 1000); //run every 1000 miliseconds (1 second)
  }

  function checkAnswer(index) {
    if (answerSelected) return;

    answerSelected = true;

    clearInterval(countdown);

    const correctIndex = questions[currentQuestion].correct;

    const isCorrect = index === correctIndex;

    const feedback = document.getElementById("feedback");

    feedback.className = isCorrect ? "correct" : "incorrect";

    const correctLabel = labels[correctIndex];
    const correctAnswer = questions[currentQuestion].answers[correctIndex];

    if (isCorrect) {
      feedback.innerHTML = `<strong>Correct!</strong> The answer is ${correctLabel}) ${correctAnswer} <br> ${questions[currentQuestion].feedback}`;

      score++;
    } else {
      if (index === -1) {
        //for time running out
        feedback.innerHTML = `<strong> Time's up </strong> The correct answer is ${correctLabel}) <br> ${questions[currentQuestion].feedback}`;
      } else {
        //for incorrect answers
        const selectedLabel = labels[index];
        const selectedAnswer = questions[currentQuestion].answers[index];

        feedback.innerHTML = `<strong>Incorrect.</strong> You selected ${selectedLabel}) ${selectedAnswer} <br> The correct answer is ${correctLabel}) ${correctAnswer} <br> ${questions[currentQuestion].feedback}`;
      }
    }

    feedback.style.display = "block";

    const answerItems = document.querySelectorAll("#answers li");

    answerItems[correctIndex].style.backgroundColor = "rgba(0, 128, 0, 0.1)";
    answerItems[correctIndex].style.borderColor = "green";

    if (index !== -1 && index !== correctIndex) {
      answerItems[index].style.backgroundColor = "rgba(255, 0, 0, 0.1)";
      answerItems[index].style.borderColor = "red";
    }

    if (currentQuestion < questions.length - 1) {
      document.getElementById("next-button").style.display = "inline-block";
    } else {
      const nextButton = document.getElementById("next-button");
      nextButton.textContent = "Show Results";
      nextButton.style.display = "inline-block";
      nextButton.onclick = showResults;
    }
  }

  function showResults() {
    document.getElementById("quiz-container").innerHTML = `<div id="result"> 
        <h2>Quiz Complete!</h2> 
        <p>You scored ${score} out of ${questions.length}</p> 
        <p>Percentage: ${Math.round((score / questions.length) * 100)}% </p> 
        <button onlick="location.reload()"> Try Again </button> 
        </div>`;
  }

  document.getElementById("next-button").addEventListener("click", () => {
    if (currentQuestion < questions.length - 1 && answerSelected) {
      currentQuestion++;

      displayQuestion();
    }
  });

  displayQuestion();
});

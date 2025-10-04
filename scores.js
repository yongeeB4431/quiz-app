let _scores = 0;
let questions = localStorage.getItem("quiz-result");
questions = JSON.parse(questions);
console.log(questions);

questions.forEach((question) => {
  if (question.correctOption) _scores++;
});

function displayScores() {
  const button = document.querySelector("button");
  const text = button.innerText;

  const scores = document.querySelector(".scores");

  const span = document.querySelector("span");
  span.innerText = `${_scores}/${questions.length}`;
  console.log(text);
  if (text == "Show Scores") {
    button.innerText = "Hide Scores";
    scores.style.display = "inline-block";
  } else {
    button.innerText = "Show Scores";
    scores.style.display = "none";
  }
}

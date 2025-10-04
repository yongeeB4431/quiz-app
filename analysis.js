let quizResult = localStorage.getItem("quiz-result");
quizResult = JSON.parse(quizResult);
console.log(quizResult);

const quizAnalysis = document.querySelector(".quiz-analysis");
quizResult.forEach((result, index) => {
  displayQuestionResult(index, result);
});

function displayQuestionResult(index, result) {
  const questionCard = document.createElement("section");
  questionCard.className = `question-card ${index + 1}`;
  let questionAnalyzer = "";

  if (result.chosenOptionIndex != -1) {
    questionAnalyzer += result.correctOption ? "Correct" : "Incorrect";
  } else questionAnalyzer = "Unanswered";

  const answerIndex = result.chosenOptionIndex;
  const optionValue = result.options[answerIndex];

  questionCard.innerHTML = `
    <h4 class="question">${index + 1}</h4>
    <p>${answerIndex == -1 ? "none" : optionValue}</p>
    <p>${questionAnalyzer}</p>
    `;

  quizAnalysis.appendChild(questionCard);
}

const characters = ["A", "B", "C", "D"];

const quizAnalyzerContainer = document.querySelector(
  ".quiz-analyzer-container"
);

let quizResult = localStorage.getItem("quiz-result");
quizResult = JSON.parse(quizResult);
console.log(quizResult);

quizResult.forEach((question, index) => displayQuizCard(question, index));

function displayQuizCard(question, index) {
  const quizCard = document.createElement("section");
  const correctAnswer = question.answer;
  const chosenIndex = question.chosenOptionIndex;
  const selectedOption = question.options[chosenIndex];

  const isCorrect = correctAnswer == selectedOption;
  const Unanswered = chosenIndex == -1;
  quizCard.className = `quiz-card ${isCorrect ? "passed" : ""}
  ${Unanswered ? "unanswered" : ""} ${
    !isCorrect && !Unanswered ? "incorrect" : ""
  }
  `;

  const options = displayOptions(question);

  quizCard.innerHTML = `
  <h4>Question ${index + 1}</h4>
  <h3 class="question">${question.question}</h3>
  <div class="options">
    ${options}
  </div>
  `;

  quizAnalyzerContainer.appendChild(quizCard);
}

function displayOptions({ question, options, chosenOptionIndex, answer }) {
  let optionHTML = ``;

  options.forEach((option, index) => {
    const optionChosen = chosenOptionIndex == index;
    const wrongAnswer = optionChosen && options[chosenOptionIndex] != answer;
    const wrongIcon = wrongAnswer
      ? `
      <i class="fa-solid fa-xmark" style="color: #b10606;"></i>
    `
      : "";

    const correctOption =
      option == answer
        ? `<i class="fa-sharp fa-solid fa-check" style="color: #01560b;"></i>`
        : "";

    optionHTML += `
        <section class="option ${index + 1}">
        <h3>
        <span>${characters[index]}.</span> 
        <span class="${optionChosen ? "underline" : ""}">${option}</span>
        ${correctOption ? correctOption : ""}
        ${wrongIcon ? wrongIcon : ""}
        </h3>
        </section>
        `;
  });

  return optionHTML;
}

console.log(quizAnalyzerContainer);

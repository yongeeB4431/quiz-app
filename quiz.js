import quizQuestions from "./quizApi.js";

for (const index in quizQuestions) {
  quizQuestions[index].chosenOptionIndex = -1;
  quizQuestions[index].correctOption = false;
}

console.log(quizQuestions[0]);
var quizIndex = 0;

function displayQuizCard(index) {
  createQuizCard(index);
  displaySubmitBtn();
}

function createOptions(values, index) {
  let optionsHtml = ``;

  values.forEach((option) => {
    optionsHtml += `
      <section class="option">
        <input type="radio" name="question-${
          index + 1
        }" value="${option}" id="${option}"/>
        <label for="${option}">${option}</label>
      </section> 
    `;
  });

  return optionsHtml;
}

function createQuizCard(index) {
  const quizContainer = document.querySelector(".quiz-container");
  const quiz = quizQuestions[index];
  const quizCard = document.createElement("div");
  quizCard.className = "quiz-card";
  const options = createOptions(quiz.options, index);

  quizCard.innerHTML = `
    <h3>Question ${index + 1}</h3>
    <h3 class="question">${quiz.question}</h3>
    <div class="options">
    ${options}
    </div>
    <div class="buttons">
    <button class="prev ${
      index == 0 ? "hide-prev-btn" : "show-prev-btn"
    }">prev</button>
    <button class="next ${
      index == quizQuestions.length - 1 ? "hide-next-btn" : "show-next-btn"
    }">next</button>
    </div>
    
  `;

  const [prevBtn, nextBtn] = quizCard.querySelectorAll("button");
  prevBtn.addEventListener("click", prevQuizCard);
  nextBtn.addEventListener("click", nextQuizCard);

  quizContainer.appendChild(quizCard);

  const optionIndex = quiz.chosenOptionIndex;
  if (optionIndex != -1) {
    const _options = document.querySelectorAll("input");
    _options[optionIndex].checked = true;
  }

  const allOptions = quizCard.querySelectorAll("input");
  allOptions.forEach((option) =>
    option.addEventListener("change", (e) => selectOption(e, quiz, index))
  );
}

function selectOption(e, quiz, index) {
  const optionSelected = e.target.value;
  const answer = quiz.answer;
  const isCorrectAnswer = optionSelected == answer;
  quizQuestions[index].chosenOptionIndex = quiz.options.indexOf(optionSelected);
  quizQuestions[index].correctOption = isCorrectAnswer;
}

function deleteQuizCard() {
  const quizCard = document.querySelector(".quiz-card");
  quizCard.remove();
}

function prevQuizCard() {
  quizIndex--;
  deleteQuizCard();
  displayQuizCard(quizIndex);
}

function nextQuizCard() {
  quizIndex++;
  deleteQuizCard();
  displayQuizCard(quizIndex);
}

function displaySubmitBtn() {
  const submitQuiz = document.querySelector(".submit-quiz");
  if (quizIndex == quizQuestions.length - 1) {
    submitQuiz.style.display = "block";
    submitQuiz.addEventListener("click", displaySubmissionCard);
    console.log("sub,itt");
  } else submitQuiz.style.display = "none";
}

function displaySubmissionCard() {
  const submissionCard = document.querySelector(".submission-card");
  submissionCard.style.display = "flex";

  let optionChosenCount = 0;
  quizQuestions.forEach((quiz) => {
    if (quiz.chosenOptionIndex != -1) optionChosenCount++;
  });

  const answeredQuestions = document.querySelector(".answered-questions");
  answeredQuestions.innerText = `${optionChosenCount}/${quizQuestions.length}`;

  const quizCard = document.querySelector(".quiz-card");
  const quizHeader = document.querySelector(".quiz-header");

  quizCard.classList.add("blur");
  quizHeader.classList.add("blur");

  const [submit, revise] = submissionCard.querySelectorAll("div");
  revise.addEventListener("click", () =>
    reviewQuestions(submissionCard, quizHeader)
  );
  submit.addEventListener("click", submitQuizQuestions);
}

function reviewQuestions(submissionCard, quizHeader) {
  submissionCard.style.display = "none";
  deleteQuizCard();

  quizIndex = 0;
  displayQuizCard(quizIndex);
  quizHeader.classList.remove("blur");
}

function submitQuizQuestions() {
  const savedQuiz = JSON.stringify(quizQuestions);
  localStorage.setItem("quiz-result", savedQuiz);
}

quizIndex = 0;
displayQuizCard(quizIndex);

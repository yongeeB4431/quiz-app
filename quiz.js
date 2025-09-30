import quizQuestions from "./quizApi.js";

let quizIndex = 0;
console.log(quizQuestions);

for (let index in quizQuestions) {
  const question = quizQuestions[index];
  const options = question.options;
  question.correctOption = options.indexOf(question.answer);
  question.selectedOption = -1;
  question.markAs = "failed";
}

displayQuestion(0);

function displayQuestion(index) {
  const question = quizQuestions[index];
  // create quiz card
  createQuizCard(question, index);
  displaySubmitButton(index);
}

function createQuizCard(question, index) {
  const card = document.createElement("section");
  card.className = "quiz-card";

  addQuiz(card, question, index);
}

function previousQuiz() {
  quizIndex--;
  deleteQuizCard();
  displayQuestion(quizIndex);
}

function nextQuiz() {
  quizIndex++;
  deleteQuizCard();
  displayQuestion(quizIndex);
}

function addQuiz(card, item, index) {
  const { question, options } = item;
  let optionsContent = displayOptions(options);

  card.innerHTML = `
   <p class="question"> <span>${index + 1}.</span> ${question}</p>
    <section class="options">
    ${optionsContent}
    </section>
    <div class="buttons">
    <button class="${
      index == 0 ? "none" : "prev"
    }" onclick="previousQuiz()">prev</button>
    <button class="${
      index == quizQuestions.length - 1 ? "none" : "next"
    }" onclick="nextQuiz()">next</button>
    </div>
  `;

  const quizCards = document.querySelector(".quiz-cards");
  quizCards.appendChild(card);

  const values = document.querySelectorAll(".quiz-card input");

  const [prevBtn, nextBtn] = document.querySelectorAll(".quiz-card button");
  prevBtn.addEventListener("click", previousQuiz);
  nextBtn.addEventListener("click", nextQuiz);

  selectOptions(values, item, index);
}

function selectOptions(values, item, index) {
  values.forEach((option) => {
    option.addEventListener("change", (e) => {
      const ref = e.target;
      const selectedIndex = item.options.indexOf(ref.id);
      quizQuestions[index].selectedIndex = selectedIndex;
      quizQuestions[index].markAs = ref.id == item.answer ? "passed" : "failed";
    });
  });
}

function displayOptions(values) {
  let optionsHTML = "";

  const renderOption = (value) => {
    optionsHTML += `
      <section class="option">
      <input name="option" type="radio" id="${value}" />
      <label for="${value}">${value}</label>
      </section>
    `;
  };
  values.forEach((value) => renderOption(value));

  return optionsHTML;
}

const deleteQuizCard = () => document.querySelector(".quiz-card").remove();

function displaySubmitButton(index) {
  const submit = document.querySelector(".submit");

  if (index == quizQuestions.length - 1) submit.style.display = "flex";
  else submit.style.display = "none";
}

function markQuiz() {
  localStorage.setItem("quiz", JSON.stringify(quizQuestions));
}

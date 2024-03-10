"use strict";

const questions = [
  {
    question: "Which is the most popular JavaScript framework?",
    options: ["Angular", "React", "Svelte", "Vue"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which company invented React?",
    options: ["Google", "Apple", "Netflix", "Facebook"],
    correctOption: 3,
    points: 10,
  },
  {
    question: "What's the fundamental building block of React apps?",
    options: ["Components", "Blocks", "Elements", "Effects"],
    correctOption: 0,
    points: 10,
  },
  {
    question:
      "What's the name of the syntax we use to describe the UI in React components?",
    options: ["FBJ", "Babel", "JSX", "ES2015"],
    correctOption: 2,
    points: 10,
  },
  {
    question: "How does data flow naturally in React apps?",
    options: [
      "From parents to children",
      "From children to parents",
      "Both ways",
      "The developers decides",
    ],
    correctOption: 0,
    points: 10,
  },
  {
    question: "How to pass data into a child component?",
    options: ["State", "Props", "PropTypes", "Parameters"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "When to use derived state?",
    options: [
      "Whenever the state should not trigger a re-render",
      "Whenever the state can be synchronized with an effect",
      "Whenever the state should be accessible to all components",
      "Whenever the state can be computed from another state variable",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question: "What triggers a UI re-render in React?",
    options: [
      "Running an effect",
      "Passing props",
      "Updating state",
      "Adding event listeners to DOM elements",
    ],
    correctOption: 2,
    points: 20,
  },
  {
    question: 'When do we directly "touch" the DOM in React?',
    options: [
      "When we need to listen to an event",
      "When we need to change the UI",
      "When we need to add styles",
      "Almost never",
    ],
    correctOption: 3,
    points: 20,
  },
  {
    question: "In what situation do we use a callback to update state?",
    options: [
      "When updating the state will be slow",
      "When the updated state is very data-intensive",
      "When the state update should happen faster",
      "When the new state depends on the previous state",
    ],
    correctOption: 3,
    points: 30,
  },
  {
    question:
      "If we pass a function to useState, when will that function be called?",
    options: [
      "On each re-render",
      "Each time we update the state",
      "Only on the initial render",
      "The first time we update the state",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question:
      "Which hook to use for an API request on the component's initial render?",
    options: ["useState", "useEffect", "useRef", "useReducer"],
    correctOption: 1,
    points: 10,
  },
  {
    question: "Which variables should go into the useEffect dependency array?",
    options: [
      "Usually none",
      "All our state variables",
      "All state and props referenced in the effect",
      "All variables needed for clean up",
    ],
    correctOption: 2,
    points: 30,
  },
  {
    question: "An effect will always run on the initial render.",
    options: [
      "True",
      "It depends on the dependency array",
      "False",
      "In depends on the code in the effect",
    ],
    correctOption: 0,
    points: 30,
  },
  {
    question: "When will an effect run if it doesn't have a dependency array?",
    options: [
      "Only when the component mounts",
      "Only when the component unmounts",
      "The first time the component re-renders",
      "Each time the component is re-rendered",
    ],
    correctOption: 3,
    points: 20,
  },
];

let currQuestion = 0;
let points = 0;
let secondsRemaining = 450;
let timerId;
const maxNumQuestions = questions.length;

const startScreen = document.querySelector(".start");
const startBtn = document.querySelector(".start > button");

const quizScreen = document.querySelector(".quiz");
const progressBar = document.querySelector(".progress progress");
const question = document.querySelector(".question h4");
const options = document.querySelector(".options");
const optionBtns = Array.from(options.children);
const nextBtn = document.querySelector(".footer > button");
const timer = document.querySelector(".timer");

const finishScreen = document.querySelector(".finish");

startBtn.addEventListener("click", function () {
  timerId = setInterval(function () {
    setTimer();
  }, 1000);
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  nextBtn.disabled = true;
  console.log(currQuestion, points, secondsRemaining);
  populateQuestion(currQuestion);
  resetOptions();
});

nextBtn.addEventListener("click", function () {
  if (currQuestion === maxNumQuestions) {
    quizScreen.style.display = "none";
    finishScreen.style.display = "flex";
    document.querySelector(
      ".result"
    ).textContent = `You have scored ${points} out of 280!`;
    return;
  }
  if (currQuestion < maxNumQuestions) {
    populateQuestion(currQuestion);
    resetOptions();
    document.querySelector(".question-number strong").textContent =
      currQuestion + 1;
    currQuestion === maxNumQuestions - 1 && (nextBtn.textContent = "Finish");
  }
});

optionBtns.map((btn, ind, buttons) =>
  btn.addEventListener("click", function () {
    const quest = questions[currQuestion];
    btn.classList.add("answer");
    buttons.map((button, index) => {
      button.disabled = true;
      if (index === quest.correctOption) {
        button.classList.add("correct");
      } else {
        button.classList.add("wrong");
      }
    });
    if (ind === quest.correctOption) {
      points += quest.points;
      document.querySelector(".points strong").textContent = points;
    }
    currQuestion++;
    progressBar.setAttribute("value", `${currQuestion}`);
    nextBtn.disabled = false;
  })
);

document.querySelector(".restart").addEventListener("click", function () {
  finishScreen.style.display = "none";
  startScreen.style.display = "flex";
  clearInterval(timerId);
  currQuestion = 0;
  points = 0;
  secondsRemaining = 450;
  nextBtn.textContent = "Next";
  progressBar.setAttribute("value", `${currQuestion}`);
  document.querySelector(".points strong").textContent = points;
  document.querySelector(".question-number strong").textContent =
    currQuestion + 1;
});

function resetOptions() {
  optionBtns.map((btn) => {
    btn.disabled = false;
    btn.classList.remove("answer", "correct", "wrong");
  });
  nextBtn.disabled = true;
}

function populateQuestion(index) {
  const quest = questions[index];
  question.textContent = quest.question;
  optionBtns.map((item, i) => (item.textContent = quest.options[i]));
}

function setTimer() {
  if (!secondsRemaining) {
    clearInterval(timerId);
    quizScreen.style.display = "none";
    finishScreen.style.display = "flex";
    document.querySelector(
      ".result"
    ).textContent = `Time's up! You have scored ${points} out of 280!`;
    return;
  }
  secondsRemaining--;
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  timer.textContent = `${mins < 10 ? "0" : ""}${mins}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

/* Selectors */
let nextBtn = document.querySelector("#next-btn");
let remainingTimeEl = document.querySelector("#remaining-timeId");
let challengeLevelEl = document.querySelector("#challenge-levelId");
let totalQuestionsEl = document.querySelector("#total-questions-Id");
let timerSelectEl = document.querySelector("#timer-selectId");
let timeRemainingEl = document.getElementById("time-rem-id");
let questionScreen = document.getElementById("questions-screen");
let answerInput = document.getElementById("ans-input-el");
let saveBtn = document.getElementById("save-results-btn");
let toggleShowResults = document.getElementById("refresh-history-btn");
let fileNameInput = document.getElementById("data-name-input");
let poolTypeEl = document.getElementById("pool-type");

//Buttons stream
let startBtn = document.querySelector("#start-btn");
let pauseBtn = document.querySelector("#pause-btn");
let stopBtn = document.querySelector("#stop-btn");

//Buttons category

let integersBtn = document.querySelector("#integers-btnId");
let fractionsBtn = document.querySelector("#integers-btnId");
let percentagesBtn = document.querySelector("#integers-btnId");
let DecimalsBtn = document.querySelector("#integers-btnId");
let MixedBtn = document.querySelector("#integers-btnId");

/* Events */
startBtn.addEventListener("click", startFx);
pauseBtn.addEventListener("click", pauseFx);
stopBtn.addEventListener("click", stopFx);
timerSelectEl.addEventListener("change", function () {
  timeRemainingEl.textContent = timer(parseInt(timerSelectEl.value));
});
nextBtn.addEventListener("click", nextFx);
saveBtn.addEventListener("click", function () {
  saveResultsFx("");
});
toggleShowResults.addEventListener("click", resultsLinksGenerator);

//DATA
let INITIAL_VALUES = {
  //Initial values
  numberOfQuestions: () => parseInt(totalQuestionsEl.value),
  time: () => timer(parseInt(timerSelectEl.value)),
  challenge: () => challengeLevelEl.value,
  poolType: () => poolTypeEl.value,
};

let CURRENT_QUESTION = {
  correctAnswer: null,
  myAnswer: null,
  expression: null,
};
let QUESTIONS_COLLECTION = [];
let COUNTER = 0; //Questions COUNTER

/* Functions */
let timeInterval;
function startFx() {
  //Monitor
  startBtn.disabled = true;
  startBtn.textContent = "started";
  stopBtn.disabled = false;
  //nextBtn.textContent = "Click";
  nextBtn.disabled = false;

  //Display question
  Operation(CURRENT_QUESTION);
  //Analytics
  let timeRem = parseInt(timerSelectEl.value);
  let stoppage = timeRem;

  timeInterval = setInterval(() => {
    timeRem -= 1;
    timeRemainingEl.textContent = timer(timeRem);
  }, 1000);

  setTimeout(() => {
    notification(stoppage + " reached.");
    clearInterval(timeInterval);
    //stop and save at timeout
    TimedOut = true;
    //Save to localstorage if self-stop
    saveResultsFx("timedout");
    Reset();
  }, stoppage * 1000);
}

//Experimental
function pauseFx() {
  screen.innerHTML = "<button>Paused</button>";
}

//Stop
function stopFx() {
  //Resets to default
  Reset();
  //Clears timer
  clearInterval(timeInterval);
}

//NEXT QUESTION
function nextFx() {
  //Monitor
  nextBtn.textContent = "NEXT";
  systemMonitorFx();

  if (COUNTER > INITIAL_VALUES.numberOfQuestions()) {
    notification(
      "Threshold already reached. Upgrade questions limit constraint to fix."
    );
    return console.log("The end");
  }

  if (COUNTER === INITIAL_VALUES.numberOfQuestions()) {
    // saveBtn.disabled = false;
    notification("Save test now!");
    fileNameInput.focus();
    return console.log("The end");
  }
  //Display EXPRESSION to pupil
  CURRENT_QUESTION.myAnswer = answerInput.value.toLowerCase(); //'undefined' might be a valid answer
  QUESTIONS_COLLECTION.push({
    expression: CURRENT_QUESTION.expression,
    correctAnswer: CURRENT_QUESTION.correctAnswer,
    myAnswer: CURRENT_QUESTION.myAnswer,
    position: COUNTER + 1,
  });

  //Re-render for next expression
  Operation(CURRENT_QUESTION);
  COUNTER += 1;

  //update questions progress
  document.querySelector("#progress-id").textContent =
    COUNTER + " of " + INITIAL_VALUES.numberOfQuestions();

  //clear and focus answer input field
  answerInput.value = "";
  answerInput.focus();
}

//supporting functions
function timer(initial) {
  let min = Math.floor(initial / 60);
  let sec = (initial - min * 60) % 60;

  let doubleSec = sec < 10 ? "0" + sec : sec;
  let doubleMin = min < 10 ? "0" + min : min;
  return doubleMin + " : " + doubleSec;
}

function Operation(question) {
  switch (INITIAL_VALUES.poolType()) {
    case "integers":
      integersFx(question);
      break;
    case "percentages":
      percentagesFx(question);
      break;
    case "decimals":
      decimalsFx(question);
      break;
    case "fractions":
      fractionsFx(question);
      break;
    case "mixed_types":
      mixedTypeFx(question);
      break;
  }

  // return question;
}

//OPERATIONS
function integersFx(question) {
  //Random number generation
  let exp = "",
    ans = null;
  let x = Math.floor(Math.random() * 16);
  let y = Math.floor(Math.random() * 55);
  let z = Math.floor(Math.random() * 26);
  let w = Math.floor(Math.random() * 16);
  let v = Math.floor(Math.random() * 10);
  switch (INITIAL_VALUES.challenge()) {
    case "easy":
      exp = x + " + " + y + " = ";
      ans = x + y;
      break;
    case "normal":
      exp = x + " + " + y + "   -" + z + " = ";
      ans = x + y - z;
      break;
    case "hard":
      exp = x + " + " + y + " - " + z + " + " + w + " = ";
      ans = x + y - z + w;
      break;
    case "very hard":
      exp = x + " + " + y + " - " + z + " + " + w + " - " + v + " = ";
      ans = x + y - z + w - v;
      break;
  }
  //Sync question metadata
  question.expression = exp;
  question.correctAnswer = ans;
  questionScreen.textContent = exp;
  console.log("Ans: ", ans);
}

//Factors generator
let series = {
  doubles: () => {
    let col = [1];
    for (let i = 1; i <= 100; i++) {
      if (i % 2 === 0) {
        col.push(i);
      }
    }
    return col;
  },
  thirds: () => {
    let col = [1];
    for (let i = 1; i <= 100; i++) {
      if (i % 3 === 0) {
        col.push(i);
      }
    }
    return col;
  },
  fourths: () => {
    let col = [1];
    for (let i = 1; i <= 100; i++) {
      if (i % 4 === 0) {
        col.push(i);
      }
    }
    return col;
  },
  fifths: () => {
    let col = [1];
    for (let i = 1; i <= 200; i++) {
      if (i % 5 === 0) {
        col.push(i);
      }
    }
    return col;
  },
  sixths: () => {
    let col = [1];
    for (let i = 1; i <= 300; i++) {
      if (i % 6 === 0) {
        col.push(i);
      }
    }
    return col;
  },
};

function fractionsFx(question) {
  //Random number generation
  let exp = "",
    ans = null;

  //index for type
  let x = Math.floor(Math.random() * series.doubles().length);
  let y = Math.floor(Math.random() * series.thirds().length);
  let z = Math.floor(Math.random() * series.fourths().length);
  let w = Math.floor(Math.random() * series.fifths().length);
  let v = Math.floor(Math.random() * series.sixths().length);
  switch (INITIAL_VALUES.challenge()) {
    case "easy":
      exp = series.doubles()[x] + "/" + series.thirds()[y] + " = ";
      ans = simplifyFraction(series.doubles()[x], series.thirds()[y]);
      break;
    case "normal":
      exp = series.doubles()[x] + "/" + series.fourths()[z] + " = ";
      ans = simplifyFraction(series.doubles()[x], series.fourths()[z]);
      break;
    case "hard":
      exp = series.fifths()[w] + "/" + series.sixths()[v] + " = ";
      ans = simplifyFraction(series.fifths()[w], series.sixths()[v]);
      break;

    case "very hard":
      exp = series.sixths()[v] + "/" + series.fourths()[z] + " = ";
      ans = simplifyFraction(series.sixths()[v], series.fourths()[z]);
      break;
  }
  //Sync question metadata
  question.expression = exp;
  question.correctAnswer = ans;
  console.log("Ans: ", ans);
  questionScreen.textContent = exp;
}
function simplifyFraction(numerator, denominator) {
  if (denominator === 0) return "undefined";
  let commonFactors = [];
  if (numerator < denominator) {
    for (let i = 1; i <= numerator; i++) {
      if (numerator % i === 0 && denominator % i === 0) {
        commonFactors.push(i);
      }
    }
  } else {
    for (let i = 1; i <= denominator; i++) {
      if (numerator % i === 0 && denominator % i === 0) {
        commonFactors.push(i);
      }
    }
  }
  if (!commonFactors) return numerator + "/" + denominator;
  let simpleNum = numerator / commonFactors[commonFactors.length - 1];
  let simpleDen = denominator / commonFactors[commonFactors.length - 1];
  if (simpleDen === 1) return simpleNum;

  return simpleNum + "/" + simpleDen;
}

function percentagesFx(question) {
  //Random number generation
  let exp = "",
    ans = null;
  //index for type
  let x = Math.floor(Math.random() * series.doubles().length);
  let y = Math.floor(Math.random() * series.thirds().length);
  let z = Math.floor(Math.random() * series.fourths().length);
  let w = Math.floor(Math.random() * series.fifths().length);
  let v = Math.floor(Math.random() * series.sixths().length);

  switch (INITIAL_VALUES.challenge()) {
    case "easy":
      exp =
        "Simplify: " +
        series.doubles()[x] +
        "% of " +
        series.thirds()[y] +
        " = ";
      ans = simplifyFraction(series.doubles()[x] * series.thirds()[y], 100);
      break;
    case "normal":
      exp =
        "Simplify: " +
        series.doubles()[x] +
        "% of " +
        series.fourths()[z] +
        " = ";
      ans = simplifyFraction(series.doubles()[x] * series.fourths()[z], 100);
      break;
    case "hard":
      exp =
        "Simplify: " +
        series.fifths()[w] +
        "% of " +
        series.sixths()[v] +
        " = ";
      ans = simplifyFraction(series.fifths()[w] * series.sixths()[v], 100);
      break;

    case "very hard":
      exp =
        "Simplify: " +
        series.sixths()[v] +
        "% of " +
        series.fourths()[z] +
        " = ";
      ans = simplifyFraction(series.sixths()[v] * series.fourths()[z], 100);
      break;
  }
  //Sync question metadata
  question.expression = exp;
  question.correctAnswer = ans;
  questionScreen.textContent = exp;
  console.log("Ans: ", ans);
}

function mixedTypeFx(question) {
  //Random number generation
  let exp = "",
    ans = null;

  //index for type
  let x = Math.floor(Math.random() * series.doubles().length);
  let y = Math.floor(Math.random() * series.thirds().length);
  let z = Math.floor(Math.random() * 20);
  let w = Math.floor(Math.random() * 6);
  let v = Math.floor(Math.random() * series.sixths().length);
  switch (INITIAL_VALUES.challenge()) {
    case "easy":
      exp = x + " ÷ " + y + " = ";
      ans = simplifyFraction(x, y);
      break;
    case "normal":
      exp = x + " + " + y + " - " + z + " = ";
      ans = x + y - z;
      break;
    case "hard":
      exp = x + " + " + y + " - " + z + " x " + w + " = ";
      ans = x + y - z * w;
      break;
    case "very hard":
      exp = series.sixths()[v] + "/" + series.fourths()[z] + " = ";
      ans = simplifyFraction(series.sixths()[v], series.fourths()[z]);
      break;
  }
  //Sync question metadata
  question.expression = exp;
  question.correctAnswer = ans;
  questionScreen.textContent = exp;
  console.log("Ans: ", ans);
}
function decimalsFx(question) {
  //Random number generation
  let exp = "",
    ans = null;
  let x = parseFloat(Math.random().toFixed(1));
  let y = Math.floor(Math.random() * 5);
  let z = parseFloat((Math.random() * 2).toFixed(1));
  let w = Math.floor(Math.random() * 6);
  let v = parseFloat(Math.random().toFixed(3));
  switch (INITIAL_VALUES.challenge()) {
    case "easy":
      exp = x + " + " + y + " = ";
      ans = x + y;
      break;
    case "normal":
      exp = x + " + " + y + "   -" + z + " = ";
      ans = (x + y - z).toFixed(1);
      break;
    case "hard":
      exp = x + " + " + y + " - " + z + " + " + w + " = ";
      ans = (x + y - z + w).toFixed(1);
      break;
    case "very hard":
      exp = x + " + " + y + " - " + z + " + " + w + " - " + v + " = ";
      ans = (x + y - z + w - v).toFixed(3);
      break;
  }
  //Sync question metadata
  question.expression = exp;
  question.correctAnswer = ans;
  questionScreen.textContent = exp;
  console.log("Ans: ", ans);
}
//RESETTING TO DEFAULT
let TimedOut = false;
function Reset() {
  //Data structure
  QUESTIONS_COLLECTION = [];
  COUNTER = 0;

  clearInterval(timeInterval);

  startBtn.textContent = "start";
  startBtn.disabled = false;
  stopBtn.disabled = true;
  saveBtn.disabled = true;
  fileNameInput.textContent = "";
  fileNameInput.disabled = true;
  fileNameInput.style.outline = "none";
  nextBtn.disabled = true;

  return;
}

//SAVING RESULTS
function saveResultsFx(mode) {
  let localStore = JSON.parse(localStorage.getItem("resultsDB"));
  if (!localStore) {
    localStore = [];
  }

  //Executes when auto timed out
  if ((mode === "timedout") & saveBtn.disabled) {
    localStore.push({
      title: "TimedOut" + localStore.length,
      questions: QUESTIONS_COLLECTION,
      time: timer(timerSelectEl.value),
      numberOfQuestions: parseInt(totalQuestionsEl.value),
      challenge: challengeLevelEl.value,
      user: JSON.parse(localStorage.getItem("log_user")).username,
    });
    localStorage.setItem("resultsDB", JSON.stringify(localStore));

    let historyLink = document.createElement("button");
    historyLink.classList.add("resultsLinkBtn");
    historyLink.textContent = "TimedOut" + localStore.length;
    document.querySelector("#history-links-cta").appendChild(historyLink);
    notification("Results saved successfully");
    return;
  }

  //Accept file name
  if (fileNameInput.value === "") {
    fileNameInput.style.outline = "solid 2px red";
    return;
  }
  localStore.push({
    title: fileNameInput.value + localStore.length,
    questions: QUESTIONS_COLLECTION,
    time: timer(timerSelectEl.value),
    numberOfQuestions: parseInt(totalQuestionsEl.value),
    challenge: challengeLevelEl.value,
    user: JSON.parse(localStorage.getItem("log_user")).username,
  });
  //reset fileNameInput formatting
  fileNameInput.style.outline = "none";

  localStorage.setItem("resultsDB", JSON.stringify(localStore));

  let historyLink = document.createElement("button");
  historyLink.classList.add("history-link");
  historyLink.textContent = fileNameInput.value + localStore.length;
  document.querySelector("#history-links-cta").appendChild(historyLink);
  saveBtn.disabled = true;
  fileNameInput.disabled = true;
  notification("Results saved successfully");
  //stop timer
  Reset();
}

//Create result link
function resultsLinksGenerator() {
  let allRecords = JSON.parse(localStorage.getItem("resultsDB"));
  if (!allRecords) {
    return (document.querySelector("#history-links-cta").textContent =
      "No history of results yet");
  }

  document.querySelector("#history-links-cta").textContent = ""; //in case of notice text

  //reguire log username
  let loggedUser = JSON.parse(
    localStorage.getItem("log_user")
  ).username.toLowerCase();

  let curUserData = allRecords.filter((data) => data.user === loggedUser);

  if (curUserData.length === 0) {
    console.log(curUserData);
    console.log("No data");
    document.querySelector("#history-links-cta").textContent =
      "No data found for " + loggedUser;
    setTimeout(() => {
      document.querySelector("#history-links-cta").textContent="";
    }, 5000);
    return;
  }

  curUserData.map((result) => {
    let historyLink = document.createElement("button");
    historyLink.classList.add("history-link");
    historyLink.textContent = result.title;
    historyLink.addEventListener("click", () => {
      //fetch quiz for historyLink and show on board as history
      let quiz = JSON.parse(localStorage.getItem("resultsDB"));
      let foundQuiz = quiz.find(
        (quizset) =>
          (quizset.title == historyLink.textContent) &
          (quizset.user ===
            JSON.parse(localStorage.getItem("log_user")).username)
      );
      if (foundQuiz) {
        //map questions

        questionScreen.replaceChildren();
        questionScreen.innerHTML = `<div class='history-header-cta'><p>Title: ${
          foundQuiz.title
        } | </p><p>Total: ${foundQuiz.numberOfQuestions} | </p><p>Attempts: ${
          foundQuiz.questions.length
        } | </p><p>Time: ${foundQuiz.time}   | </p><p>SCORE: ${
          foundQuiz.questions.filter((q) => q.myAnswer == q.correctAnswer)
            .length
        }</p></div>`;
        foundQuiz.questions.map((q) => {
          let quest = document.createElement("span");
          quest.innerHTML =
            "<h4 style='font-size:1.2rem; padding:3px;'> <span style='padding-right:1rem'>" +
            q.position +
            ").</span>  " +
            q.expression +
            "</h4>" +
            "<div> <h6> Your ans: " +
            q.myAnswer +
            "</h6>" +
            "<h6> Correct ans: " +
            q.correctAnswer +
            "</h6></div>" +
            `<img src='${
              q.myAnswer == q.correctAnswer
                ? "success_mark.png"
                : "incorrect.svg"
            }' alt='mark' width=25 height=25 />`;
          quest.classList.add("history-question-model");
          // questionScreen.appendChild(quest)
          return questionScreen.appendChild(quest);
        });
      }
    });
    return document
      .querySelector("#history-links-cta")
      .appendChild(historyLink);
  });
}

//Auto controller

function systemMonitorFx() {
  // saveBtn.disabled=true
  saveBtn.disabled =
    INITIAL_VALUES.numberOfQuestions() === COUNTER ? false : true;
  fileNameInput.disabled =
    INITIAL_VALUES.numberOfQuestions() === COUNTER ? false : true;
}
// localStorage.clear();

//Notification
function notification(message) {
  let noticeDiv = document.querySelector(".notice-div");

  if (message) {
    noticeDiv.style.display = "block";
    noticeDiv.textContent = message;
    noticeDiv.style.bottom = "69%";
  }
  setTimeout(() => {
    noticeDiv.style.display = "none";
    noticeDiv.style.bottom = "initial";
  }, 5000);
}

// LANDING
//Elements
let loginForm = document.querySelector(".login-form");
let loginUsernameEl = document.querySelector("#login-username-input");
let loginPasswordEl = document.querySelector("#login-password-input");
let gotoRegisterEl = document.querySelector("#goto-register-H");
let loginBtn = document.querySelector("#login-btn");

let registerForm = document.querySelector(".register-form");
let registerUsernameEl = document.querySelector("#register-username-input");
let registerPasswordEl = document.querySelector("#register-password-input");
let gotoLoginEl = document.querySelector("#goto-login-H");
let registerBtn = document.querySelector("#register-btn");

//EVENTS
//login
gotoLoginEl.addEventListener("click", function () {
  loginForm.style.display = "flex";
  registerForm.style.display = "none";
});
loginForm.addEventListener("submit", loginFx);
//register
gotoRegisterEl.addEventListener("click", function () {
  loginForm.style.display = "none";
  registerForm.style.display = "flex";
});
registerForm.addEventListener("submit", registerFx);

//logout
document.querySelector("#logout-btn").addEventListener("click", logoutFx);

//FUNCTIONS
function loginFx(e) {
  e.preventDefault();

  let clientUser = loginUsernameEl.value;
  let clientPass = loginPasswordEl.value;

  let notice = document.querySelector(".notice-log");
  notice.style.color = "green";

  let data = JSON.parse(localStorage.getItem("users"));
  if (!data) {
    data = [];
    notice.textContent = "No users! Register to continue.";
    notice.style.visibility = "visible";
    setTimeout(() => {
      notice.style.visibility = "hidden";
    }, 4000);
    return;
  }
  let foundMatch = data.find(
    (user) => user.username === clientUser.toLowerCase()
  );

  if (!foundMatch) {
    notice.textContent = "Username not found!";
    notice.style.visibility = "visible";
    setTimeout(() => {
      notice.style.visibility = "hidden";
    }, 4000);
    return;
  }

  if (foundMatch.password !== clientPass) {
    notice.textContent = " Incorrect password!";
    notice.style.visibility = "visible";
    setTimeout(() => {
      notice.style.visibility = "hidden";
    }, 4000);
    return;
  }

  //log user
  localStorage.setItem(
    "log_user",
    JSON.stringify({ username: clientUser, password: clientPass, status: true })
  );
  document.querySelector(".avatar-name").textContent = clientUser;
  //Navigate to dashboard
  document.querySelector("#main").style.display = "flex";
  document.querySelector(".logPane").style.display = "none";
}

function registerFx(e) {
  e.preventDefault();
  //Validation

  let clientUser = registerUsernameEl.value;
  let clientPass = registerPasswordEl.value;

  let notice = document.querySelector(".register-notice");

  let data = JSON.parse(localStorage.getItem("users"));
  if (!data) {
    data = [];
  }
  if (data) {
    let match = data.find((user) => user.username === clientUser.toLowerCase());
    if (match) {
      notice.textContent = clientUser + " already exists!";
      notice.style.visibility = "visible";
      console.log("data", match);
      setTimeout(() => {
        notice.style.visibility = "hidden";
      }, 4000);
      return;
    }
  }
  //now saving
  data.push({ username: clientUser.toLowerCase(), password: clientPass });
  localStorage.setItem("users", JSON.stringify(data));

  notice.textContent = "Registration successful!";
  notice.style.visibility = "visible";
  setTimeout(() => {
    notice.style.visibility = "hidden";
  }, 4000);
}

function logoutFx() {
  localStorage.setItem(
    "log_user",
    JSON.stringify({ access: false, username: "", password: "" })
  );
  //Navigate to dashboard
  document.querySelector("#main").style.display = "none";
  document.querySelector(".logPane").style.display = "flex";
}
function logInputValidator(targetInput, message, form) {
  let inputNode = document.querySelector(targetInput);
  if (!inputNode.value) {
    inputNode.style.outline = "solid 1px red";
    inputNode.focus();

    let notice = document.createElement("span");
    notice.style.color = "green";
    notice.textContent = message;
    document.querySelector(form).appendChild(notice);

    setTimeout(() => {
      document.querySelector(form).removeChild(notice);
    }, 3000);
    return;
  }
  inputNode.style.outline = "none";
}

//Session status
// *****************************************************************
function checkLogStatus() {
  let user = JSON.parse(localStorage.getItem("log_user"));
  if (!user) return;
  if (user.status) {
    document.querySelector(".avatar-name").textContent = user.username;
    //Navigate to dashboard
    document.querySelector("#main").style.display = "flex";
    document.querySelector(".logPane").style.display = "none";
  } else {
    //Avoid dashboard
    document.querySelector("#main").style.display = "none";
    document.querySelector(".logPane").style.display = "flex";
  }
}
checkLogStatus();
// *****************************************************************

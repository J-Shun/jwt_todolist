// form
const loginForm = document.querySelector(".loginForm");
const signUpForm = document.querySelector(".signUpForm");

// input
const signUpEmail = document.querySelector(".signUpEmail");
const nickName = document.querySelector(".nickName");
const signUpPassword = document.querySelector(".signUpPassword");
const signUpPasswordCheck = document.querySelector(".signUpPasswordCheck");

// button
const loginBtn = document.querySelector(".loginBtn");
const signUpPageBtn = document.querySelector(".signUpPageBtn");
const signUpBtn = document.querySelector(".signUpBtn");
const loginPageBtn = document.querySelector(".loginPageBtn");

const url = "https://todoo.5xcamp.us/";
const users = "users/";
const obj = { user: {} };
let passed = false;

// test123456@gmail.com
// test123456
// "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTg3Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjU2NTc0NjE5LCJleHAiOjE2NTc4NzA2MTksImp0aSI6ImIwMmExZDcyLTIwNDItNGExNi1iZWIxLWYxYTNkNjdjYTc2ZCJ9.nwnpk3N9P0WLfdlDrrayB1tBdnsMjm-lcKquY5ki0Vo"

// change form
function toLogin(e) {
  e.preventDefault();
  location.reload();
}

function toSignUp(e) {
  e.preventDefault();
  loginForm.classList.add("d-none");
  signUpForm.classList.remove("d-none");
}

// form rule check
function checkEmail(e) {
  const email = signUpEmail.value;
  const emailCheck = document.querySelector(".signUpEmailCheck");
  const emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!emailRule.test(email)) {
    emailCheck.classList.remove("d-none");
    return false;
  } else {
    emailCheck.classList.add("d-none");
    return true;
  }
}

function checkLength(e) {
  const length = nickName.value.length;
  const lengthCheck = document.querySelector(".checkNickName");
  if (length < 1) {
    lengthCheck.classList.remove("d-none");
    return false;
  } else {
    lengthCheck.classList.add("d-none");
    return true;
  }
}

function checkPassword(e) {
  const length = signUpPassword.value.length;
  const lengthCheck = document.querySelector(".checkSignUpPassword");
  if (length < 8) {
    lengthCheck.classList.remove("d-none");
    return false;
  } else {
    lengthCheck.classList.add("d-none");
    return true;
  }
}

function doubleCheck(e) {
  const doubleCheckPassword = document.querySelector(".doubleCheckPassword");
  if (
    signUpPasswordCheck.value !== signUpPassword.value ||
    signUpPasswordCheck.value.length === 0
  ) {
    doubleCheckPassword.classList.remove("d-none");
    return false;
  } else {
    doubleCheckPassword.classList.add("d-none");
    return true;
  }
}

function signUp(e) {
  e.preventDefault();
  if (!checkEmail() || !checkLength() || !checkPassword() || !doubleCheck()) {
    checkEmail();
    checkLength();
    checkPassword();
    doubleCheck();
    alert("請輸入正確內容");
  } else {
    // sign up with the input
    obj.user.email = signUpEmail.value;
    obj.user.nickname = nickName.value;
    obj.user.password = signUpPassword.value;
    axios
      .post(url + users, obj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// form rule check
signUpEmail.addEventListener("input", checkEmail);
nickName.addEventListener("input", checkLength);
signUpPassword.addEventListener("input", checkPassword);
signUpPasswordCheck.addEventListener("input", doubleCheck);

// change form
signUpPageBtn.addEventListener("click", toSignUp);
loginPageBtn.addEventListener("click", toLogin);

// sign up
signUpBtn.addEventListener("click", signUp);

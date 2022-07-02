// form
const loginForm = document.querySelector(".loginForm");
const signUpForm = document.querySelector(".signUpForm");

// input (sign up)
const signUpEmail = document.querySelector(".signUpEmail");
const nickName = document.querySelector(".nickName");
const signUpPassword = document.querySelector(".signUpPassword");
const signUpPasswordCheck = document.querySelector(".signUpPasswordCheck");

// input (login)
const loginEmail = document.querySelector(".loginEmail");
const loginPassword = document.querySelector(".loginPassword");

// button
const loginBtn = document.querySelector(".loginBtn");
const signUpPageBtn = document.querySelector(".signUpPageBtn");
const signUpBtn = document.querySelector(".signUpBtn");
const loginPageBtn = document.querySelector(".loginPageBtn");

const url = "https://todoo.5xcamp.us/";
const users = "users/";
const obj = { user: {} };
let passed = false;
let token;
let nickname;

// test123456@gmail.com
// test123456
// "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNjA4Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjU2NjY4NDkzLCJleHAiOjE2NTc5NjQ0OTMsImp0aSI6IjI4YzYyNmE1LTU2NmUtNGExYy05ZjU1LTFkNGRkMGI4Mzk2ZSJ9.pqLJ1FW1aHMnAlYG3yXqvVvndxf50x2HT1AOndRoIeQ"

// change form
function toLogin(e) {
  e.preventDefault();
  location.reload();
}

function toSignUp(e) {
  e.preventDefault();
  loginForm.classList.add("disappear");
  loginForm.classList.add("d-none");

  signUpForm.classList.add("appear");
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

function login(e) {
  e.preventDefault();
  if (loginEmail.value < 1 || loginPassword.value < 1) {
    alert("請輸入正確資料");
    location.reload();
    return;
  } else {
    obj.user.email = loginEmail.value;
    obj.user.password = loginPassword.value;
    axios
      .post(url + users + "sign_in", obj)
      .then((res) => {
        alert("登入成功");
        token = res.headers.authorization;
        nickname = res.data.nickname;
        localStorage.setItem("userToken", token);
        localStorage.setItem("userNickname", nickname);
      })
      .catch((err) => {
        alert(res.data.message);
      });
  }
}

function redirect() {
  if (localStorage.getItem("userToken")) {
    document.location.href = "./todo.html";
  } else {
    console.log("no token");
  }
}

// form rule check (sign up)
signUpEmail.addEventListener("input", checkEmail);
nickName.addEventListener("input", checkLength);
signUpPassword.addEventListener("input", checkPassword);
signUpPasswordCheck.addEventListener("input", doubleCheck);

// form rule check ()

// change form
signUpPageBtn.addEventListener("click", toSignUp);
loginPageBtn.addEventListener("click", toLogin);

// sign up
signUpBtn.addEventListener("click", signUp);

// login
loginBtn.addEventListener("click", login);

// redirect();

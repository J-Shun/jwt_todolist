// config
const url = "https://todoo.5xcamp.us/todos/";
const userToken = localStorage.getItem("userToken");
const userName = localStorage.getItem("userNickname");
const config = { headers: { Authorization: userToken } };
let data = [];

// button
const addBtn = document.querySelector(".plus");
const allTag = document.querySelector(".all-tag");
const yetTag = document.querySelector(".yet-tag");
const finishedTag = document.querySelector(".finished-tag");
const clearFinishedBtn = document.querySelector(".clear-finished");
const clearAll = document.querySelector(".clear-all");
const logout = document.querySelector(".logout");

// display
const enterBar = document.querySelector(".enter-bar");
const owner = document.querySelector(".owner");
const todoBoard = document.querySelector(".todo-board");

// function
function init() {
  if (!localStorage.getItem("userToken")) {
    redirect();
  } else {
    axios
      .get(url, config)
      .then((res) => {
        data = res.data.todos;
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function redirect() {
  document.location.href = "./index.html";
}

function render() {
  let allContent = "";
  data.forEach((item) => {
    allContent += `<li class="todo-item bottom-line d-flex align-items-center position-relative">
    <label class="label d-flex align-items-center w-100 cursor-pointer">
      <input type="checkbox" class="d-none"/>
      <span class="check-mark position-relative cursor-pointer me-2"></span>
      <span class="content">${item.content}</span>
    </label>
    <i class="trash-icon fa-solid fa-trash-can cursor-pointer" data-id=${item.id}></i>
  </li>`;
  });
  todoBoard.innerHTML = allContent;
}

function time() {
  const now = new Date();
  let day = now.getDay();
  let hours =
    now.getHours() < 10 ? "0" + String(now.getHours()) : now.getHours();
  let minutes =
    now.getMinutes() < 10 ? "0" + String(now.getMinutes()) : now.getMinutes();
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const week = document.querySelector(".week");
  const time = document.querySelector(".time");

  week.textContent = `${weekday[day]}`;
  time.textContent = `${hours}:${minutes}`;
}

function userLogout() {
  axios
    .delete("https://todoo.5xcamp.us/users/sign_out", config)
    .then((res) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userNickname");
      alert(res.data.message);
      redirect();
    })
    .catch((err) => {
      console.log(err);
      alert("登出失敗");
    });
}

function addTask() {
  const obj = { todo: {} };
  obj.todo.content = enterBar.value;
  enterBar.value = "";

  axios
    .post(url, obj, config)
    .then((res) => {
      data.unshift(res.data);
      render();
    })
    .catch((err) => {
      alert(err);
    });
}

function deleteTask(e) {
  if (!e.target.classList.contains("trash-icon")) return;
  const targetId = e.target.getAttribute("data-id");
  axios
    .delete(url + targetId, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

logout.addEventListener("click", userLogout);

addBtn.addEventListener("click", addTask);
enterBar.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addBtn.click();
  }
});

todoBoard.addEventListener("click", deleteTask);

init();
owner.textContent = `${userName}的清單`;
setInterval(time, 1000);

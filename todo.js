// config
const url = "https://todoo.5xcamp.us/todos/";
const userToken = localStorage.getItem("userToken");
const userName = localStorage.getItem("userNickname");
const config = { headers: { Authorization: userToken } };
let data = [];
let checkStatus = "";
let position = 1;

// button
const addBtn = document.querySelector(".plus");
const allTag = document.querySelector(".all-tag");
const yetTag = document.querySelector(".yet-tag");
const finishedTag = document.querySelector(".finished-tag");
const clearFinishedBtn = document.querySelector(".clear-finished");
const clearAll = document.querySelector(".clear-all");
const logout = document.querySelector(".logout");

// display
const owner = document.querySelector(".owner");
const main = document.querySelector("main");
const enterBar = document.querySelector(".enter-bar");
const todoBoard = document.querySelector(".todo-board");
const loading = document.querySelector(".legend");

// function
function init() {
  loading.classList.remove("d-none");
  if (!localStorage.getItem("userToken")) {
    redirect();
  } else {
    owner.textContent = `Hi! ${localStorage.getItem("userNickname")}`;
    axios
      .get(url, config)
      .then((res) => {
        data = res.data.todos;
        data.reverse();
        render();
        loading.classList.add("d-none");
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

  if (position === 1) {
    data.forEach((item) => {
      if (item.completed_at) {
        checkStatus = "checked";
      }
      allContent += `
        <li class="todo-item bottom-line d-flex align-items-center position-relative" data-id=${item.id}>
          <label class="label d-flex align-items-center w-100 cursor-pointer">
            <input type="checkbox" class="d-none" ${checkStatus}/>
            <span class="check-mark position-relative cursor-pointer me-2"></span>
            <span class="content">${item.content}</span>
          </label>
          <span class="circle d-flex justify-content-center align-items-center cursor-pointer">
            <i class="fa-solid fa-trash-can text-white pointer-events no-event"></i>
          </span>
        </li>
      `;
      checkStatus = "";
    });
  } else if (position === 2) {
    data.forEach((item) => {
      if (!item.completed_at) {
        allContent += `
          <li class="todo-item bottom-line d-flex align-items-center position-relative" data-id=${item.id}>
            <label class="label d-flex align-items-center w-100 cursor-pointer">
              <input type="checkbox" class="d-none" ${checkStatus}/>
              <span class="check-mark position-relative cursor-pointer me-2"></span>
              <span class="content">${item.content}</span>
            </label>
            <span class="circle d-flex justify-content-center align-items-center cursor-pointer">
              <i class="fa-solid fa-trash-can text-white pointer-events no-event"></i>
            </span>
          </li>
        `;
      }
    });
  } else {
    data.forEach((item) => {
      if (item.completed_at) {
        checkStatus = "checked";
        allContent += `
          <li class="todo-item bottom-line d-flex align-items-center position-relative" data-id=${item.id}>
            <label class="label d-flex align-items-center w-100 cursor-pointer">
              <input type="checkbox" class="d-none" ${checkStatus}/>
              <span class="check-mark position-relative cursor-pointer me-2"></span>
              <span class="content">${item.content}</span>
            </label>
            <span class="circle d-flex justify-content-center align-items-center cursor-pointer">
              <i class="fa-solid fa-trash-can text-white pointer-events no-event"></i>
            </span>
          </li>
        `;
      }
      checkStatus = "";
    });
  }
  todoBoard.innerHTML = allContent;
  main.classList.remove("no-event");
  loading.classList.add("d-none");
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
  if (enterBar.value.length < 1) return;
  const obj = { todo: {} };
  obj.todo.content = enterBar.value;
  enterBar.value = "";
  loading.classList.remove("d-none");

  axios
    .post(url, obj, config)
    .then((res) => {
      data.push(res.data);
      render();
    })
    .catch((err) => {
      alert(err);
    });
}

function toggleStatus(e) {
  if (e.target.nodeName !== "INPUT") return;
  main.classList.add("no-event");
  const targetId = e.target.parentNode.parentNode.getAttribute("data-id");
  const targetObj = data.filter((item) => item.id === targetId)[0];
  loading.classList.remove("d-none");

  axios
    .patch(url + targetId + "/toggle", "", config)
    .then((res) => {
      data.splice(data.indexOf(targetObj), 1, res.data);
      render();
    })
    .catch((err) => {
      alert("錯誤");
      render();
    });
}

function deleteTask(e) {
  if (!e.target.classList.contains("circle")) return;
  main.classList.add("no-event");
  const targetId = e.target.parentNode.getAttribute("data-id");
  const targetItem = data.filter((item) => item.id === targetId)[0];
  loading.classList.remove("d-none");

  axios
    .delete(url + targetId, config)
    .then((res) => {
      data.splice(data.indexOf(targetItem), 1);
      render();
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteFinished(e) {
  if (data.length < 1) return;
  main.classList.add("no-event");
  loading.classList.remove("d-none");

  data.forEach((item) => {
    if (item.completed_at) {
      axios
        .delete(url + item.id, config)
        .then((res) => {
          data.splice(data.indexOf(item), 1);
          render();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}

function deleteAll(e) {
  if (data.length < 1) return;
  main.classList.add("no-event");
  loading.classList.remove("d-none");

  data.forEach((item) => {
    axios
      .delete(url + item.id, config)
      .then((res) => {
        data.splice(0, 1);
        render();
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

function checkAll(e) {
  position = 1;
  allTag.classList.add("active");
  yetTag.classList.remove("active");
  finishedTag.classList.remove("active");
  loading.classList.remove("d-none");
  render();
}

function checkYet(e) {
  position = 2;
  yetTag.classList.add("active");
  allTag.classList.remove("active");
  finishedTag.classList.remove("active");
  loading.classList.remove("d-none");
  render();
}

function checkDone(e) {
  position = 3;
  finishedTag.classList.add("active");
  allTag.classList.remove("active");
  yetTag.classList.remove("active");
  loading.classList.remove("d-none");
  render();
}

logout.addEventListener("click", userLogout);

addBtn.addEventListener("click", addTask);
enterBar.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    addBtn.click();
  }
});

todoBoard.addEventListener("click", deleteTask);

clearFinishedBtn.addEventListener("click", deleteFinished);

clearAll.addEventListener("click", deleteAll);

todoBoard.addEventListener("click", toggleStatus);

allTag.addEventListener("click", checkAll);

yetTag.addEventListener("click", checkYet);

finishedTag.addEventListener("click", checkDone);

init();
setInterval(time, 1000);

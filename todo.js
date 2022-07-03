const enterBar = document.querySelector(".enter-bar");
const addBtn = document.querySelector(".plus");
const allTag = document.querySelector(".all-tag");
const yetTag = document.querySelector(".yet-tag");
const finishedTag = document.querySelector(".finished-tag");
const quantity = document.querySelector(".quantity");
const clearFinished = document.querySelector(".clear-finished");
console.log(clearFinished);

function time() {
  const now = new Date();
  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
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

setInterval(time, 1000);

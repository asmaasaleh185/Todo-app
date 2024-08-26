let form = document.getElementsByTagName("form")[0];
let input = document.getElementById("task");
let todolist = document.querySelector(".list ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(input.value);
  addTask();
});

let todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((element) => {
    addTask(element);
  });
}

function addTask(element) {
  let taskContent = document.createElement("li");
  let text = input.value;

  if (element) {
    text = element.text;
  }
  if (text) {
    taskContent.innerHTML = `
    <div class="check ${
      element && element.complete ? "active-check" : ""
    }"><img src="images/icon-check.svg" alt=""></div>
    <p class="taskText ${
      element && element.complete ? "complete" : ""
    }">${text}</p>
    <button class="close"><img src="images/icon-cross.svg" alt=""></button>
    `;
    
    // add task
    todolist.appendChild(taskContent);
    updateList();
  }

  // for closing task
  let close = taskContent.querySelector(".list ul li .close");

  close.addEventListener("click", () => {
    taskContent.remove();
    updateList();
  });

  // for completing task
  let check = taskContent.querySelector(".list ul li .check");

  check.addEventListener("click", () => {
    check.classList.toggle("active-check");
    taskContent.children[1].classList.add("complete");
    updateList();
  });
  text = "";
}

function updateList() {
  let taskText = document.querySelectorAll(".taskText");
  let arr = [];
  taskText.forEach((element) => {
    arr.push({
      text: element.innerText,
      complete: element.classList.contains("complete"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(arr));
  calcLeftTask();
}

// filter tasks
let navList = document.querySelectorAll(".info nav ul li a");
let todolistLi = document.querySelectorAll(".list ul li");

for (let items of navList) {
  items.addEventListener("click", function (e) {
    e.preventDefault();
    for (let item of navList) {
      item.parentElement.classList.remove("active");
    }
    this.parentElement.classList.add("active");
    if (this.innerText === "Active") {
      todolistLi.forEach((element) => {
        if (!element.children[1].classList.contains("complete")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
      });
    } else if (this.innerText === "Completed") {
      todolistLi.forEach((element) => {
        if (element.children[1].classList.contains("complete")) {
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
      });
    } else {
      todolistLi.forEach((element) => {
        element.style.display = "flex";
      });
    }
  });
}

// Clear all completed tasks
let clear = document.querySelector(".clear");

clear.addEventListener("click", () => {
  todolistLi.forEach((element) => {
    if (element.children[1].classList.contains("complete")) {
      element.remove();
      updateList();
    }
  });
});

// calculate left tasks
function calcLeftTask() {
  let leftTask = document.querySelector(".left");
  let completedTask = document.querySelectorAll(".list ul li .complete");
  let todolistLi = document.querySelectorAll(".list ul li");
  let diff = 0;

  if (todolistLi && completedTask) {
    diff = todolistLi.length - completedTask.length;
  }
  leftTask.innerText = `${diff} items left`;
}
calcLeftTask();

// changing mode
let flag = false;
let element = document.getElementById("lightMode");
let content = document.getElementsByClassName("content")[0];
let list = document.querySelector(".list");
let info = document.querySelector(".info");

if (element) {
  element.addEventListener("click", () => {
    flag = !flag;
    if (flag) {
      document.body.style.backgroundColor = "hsl(0, 0%, 98%)";
      content.classList.add("light");
      task.classList.add("light-input");
      list.classList.add("light-list");
      info.classList.add("light-list");
    } else {
      document.body.style.backgroundColor = "hsl(235, 21%, 11%)";
      content.classList.remove("light");
      task.classList.remove("light-input");
      list.classList.remove("light-list");
      info.classList.remove("light-list");
    }
  });
}

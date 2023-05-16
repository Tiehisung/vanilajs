//Selectors
let addBtn = document.querySelector("#addBtn");
let inputEl = document.getElementById("input-el");
let todosListEl = document.querySelector(".todos-list");
let selectEl = document.querySelector(".selectEl");

//Events
addBtn.addEventListener("click", createTodo);
todosListEl.addEventListener("click", markcompletedOrDelete);
selectEl.addEventListener("change", showCategory);

//Functions
function createTodo() {
  if (!inputEl.value)
    return (document.getElementById("input-el").style.outline =
      "solid 2px salmon");

  document.getElementById("input-el").style.outline = "none";

  let li = document.createElement("li");
  li.classList.add("todoLi");

  //   container and buttons
  let btnCont = document.createElement("div");
  btnCont.innerHTML =
    "<button class='mark-btn'>C</button><button class='delete-btn'>&times;</button>";
  btnCont.classList.add("markAndDelCta");
  let todoDesc = document.createElement("span");
  todoDesc.textContent = inputEl.value;
  li.appendChild(todoDesc);

  //Save todo to localStorage
  saveToLocalStorage(inputEl.value);

  li.appendChild(btnCont);
  todosListEl.appendChild(li);

  //Clear input
  inputEl.value = "";
  inputEl.focus();
}

function markcompletedOrDelete(e) {
  const element = e.target;
  if (element.classList[0] === "delete-btn") {
    console.log(element.parentElement.parentElement.parentElement.children);
    //fall animations
    element.parentElement.parentElement.classList.toggle("fallOnDelete");

    //immediate parent of delete button is a div
    let parent1 = element.parentElement;
    //Grandparent is the li
    let parent2 = parent1.parentElement;

    parent2.addEventListener("transitionend", function () {
      parent2.remove();
    });

    //Alternatively
    // element.parentElement.parentElement.remove()
  }
  if (element.classList[0] === "mark-btn") {
    element.parentElement.parentElement.classList.add("completedTodo");
  }
}

function saveToLocalStorage(todo) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos === null) {
    localStorage.setItem("todos", JSON.stringify([todo]));
  } else {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function deleteLocalStorageTodo(todoIndex) {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(todoIndex, 1);
}

function showCategory(e) {
  let todos = todosListEl.childNodes ;
  console.log(todos)
  if (e.target.value === "all") {
    todos.forEach((todo, i) => {
      todo.style.display = "flex";
    });
  } else if (e.target.value === "completed") {
    todos.forEach((todo) => {
      console.log(todo.classList);
        todo.style.display = todo.classList.contains("completedTodo") ? "flex" : "none";
    });
  } else {
    todos.forEach((todo) => {
      todo.style.display = todo.classList.contains("completedTodo")
        ? "none"
        : "flex";
    });
  }
}

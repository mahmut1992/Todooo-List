//! DİNAMİK OLARAK ELEMENT OLUŞTURMAK

// const cardBody = document.querySelectorAll(".card-body")[1];

// const link = document.createElement("a");
// link.id = "goBlockWebsite";
// link.className = "btn btn-dark btn-sm mt-3";
// link.href = "http://enesbayram.net";
// link.target = "_blank";
// link.innerHTML = "Kişisel Websiteme Git";

// cardBody.appendChild(link);

// console.log(link);

//! ELEMAN SİLMEK

// link.remove();

//! ELEMENTLERİN YERİNİ DEĞİŞTİRMEK

// const cardBody = document.querySelectorAll(".card-body")[1];

// const newTitle = document.createElement("h1");

// newTitle.className = "card-title";
// newTitle.textContent = "Todo Listesi Yeni";

// cardBody.replaceChild(newTitle, cardBody.childNodes[1]); // 2. paremetreyi hep node tipinde ister

//! EVENTS

// function changeTitle() {
//   document.querySelectorAll(".card-title")[1].textContent = "değişti";
// }

//const clearButton = document.getElementById("todoClearButton");

// clearButton.addEventListener("click", function () {
//   document.querySelectorAll(".card-title")[1].textContent = "değişti";
// });

//clearButton.addEventListener("click", changeTitle); // changeTitle() yapma yoksa click olmadan çalışır kod

// function changeTitle() {
//   document.querySelectorAll(".card-title")[1].textContent = "değişti";
// }

//! MOUSE EVENTS

// DOMContentLoaded
//load

//click
//dbclick
//mouseover
//mosueout
//mouseenter
//mouseleave

//! KLAVYE EVENS

// keypress Sadece harfler ve sayıları alır

//? e.key e.keyCode

// document.addEventListener("keyup", run);

// function run(e) {
//   console.log(e.key);
// }

// keydown Tüm klavye tuşlarında çalışır
// keyup Tuştan elini kaldırdığında çalışır tüm tuşlar için

// örnek f5 e bastığında sayfa yenilenmesin

// document.addEventListener("keydown", run1);

// function run1(e) {
//   console.log(e.keyCode);
//   if (e.keyCode == 116) {
//     alert(`Sayfa yenileme elgellendi`);
//   }
//   e.preventDefault();
// }

// const cardTitle = document.querySelectorAll(".card-title")[0];

// const input = document.querySelector("#todoName");

// input.addEventListener("keyup", run);

// function run(e) {
//   cardTitle.textContent = e.target.value;
// }

//! İNPUT EVENTS

// focus içine girdiğinde
// blur  içinden çıkıtığında
// copy  inputun içinde ki yazıyı copyaladığında
// paste  dışardan aldığın bir texti inputa paste yani yapıştırma yaptığında
// select  textin içindeki bir kısmı maus ile seçtim elimi mauseden çektiğim an çalışır
// cut   inputtaki bir texti ctrl X yapıp kestiğinde

// const todo = document.querySelector("#todoName");

// todo.addEventListener("focus", run);

// function run(e) {
//   console.log(e.type);
// }

//! DOM TODO LİST UYGULAMA

let todos = [];

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#todoClearButton");
const filterInput = document.querySelector("#todosearch");

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoUI);
  clearButton.addEventListener("click", allTodosEveryWhere);
  filterInput.addEventListener("keyup", filter);
}
runEvents();

function allTodosEveryWhere() {
  const todoList = document.querySelectorAll(".list-group-item");
  if (todoList.length > 0) {
    //ekrandan UI silme
    todoList.forEach((todo) => {
      todo.remove();
      //storage den silme
    });
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    showAlert("success", "Tüm Todo lar silindi");
  } else {
    showAlert("warning", "Silmek için en az bir todo olmaldıır!!");
  }
}

function pageLoaded() {
  checkTodosFtomstorage();
  todos.forEach((todo) => {
    addTodoUI(todo);
  });
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach((todo) => {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display : block");
      } else {
        todo.setAttribute("style", "display : none !important");
      }
    });
  } else {
    showAlert("warning", "Filtreleme için en az bir todo giriniz");
  }
}

function removeTodoUI(e) {
  if (e.target.className === "fa-solid fa-xmark") {
    // UI (Ekrandan silme)
    const todo = e.target.parentElement.parentElement;
    todo.remove();
    //Storage den silme
    removeTodoStorage(todo.textContent);
    showAlert("success", "Todo Başarıyla Silindi");
  }
}

function removeTodoStorage(removeTodo) {
  checkTodosFtomstorage();
  todos.forEach((todo, index) => {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen Boş Bırakmayınız");
  } else {
    // Ara yüze ekleme
    addTodoUI(inputText);
    // Storage yükleme
    addTodoStorage(inputText);
    showAlert("success", "Todo Eklendi");
  }

  e.preventDefault(); // Submit bizi farklı sayfaya yönlendirir preventDefault() bunun önüne geçer
}

function addTodoUI(newTodo) {
  /*
<li class="list-group-item d-flex justify-content-between">
                
                <a href="#" class="delete-item">
                  <i class="fa-solid fa-xmark"></i>
                </a>
              </li>
              */
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item";

  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);
  addInput.value = "";
}

function addTodoStorage(newTodo) {
  checkTodosFtomstorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function checkTodosFtomstorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

function showAlert(type, message) {
  //   <div class="alert alert-warning mt-3" role="alert">
  //   This is a warning alert—check it out!
  // </div>

  const div = document.createElement("div");
  div.className = `mt-3 alert alert-${type}`;
  div.role = "alert";
  div.textContent = message;
  firstCardBody.appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 3000);
}

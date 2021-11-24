const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners() { // Butun event listener 
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);

}
//Butun Todolari Temizleme
function clearAllTodos(e){
    if(confirm("Butun Todolari Silmek Istediyinizden Eminsiz ?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

// Todolari Filtreleme
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            // Bulamadi
            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
}


// Arayuzdeki todolari silmek
function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);

        showAlert("success","Todo basari ile silindi...");
    }
}

// Todolari Storageden silmek
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // Arraylerden degeri silebiliriz.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}


// Sehife tekrar yuklendikde storagedaki  todolari gostermek 
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}



// Storageden Todolari almaq.
function getTodosFromStorage(){ // Storageden Todolari alma
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
       todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}

// Sehifeye todo eklemek
function addTodo(e) {

    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger","Lutfen bir todo girin...");
    }
    else{

        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo basari ile eklendi...");
        
    }

    e.preventDefault();
}


// Sehifemize bos todo ve ya todo yazdiqda bildiris gostermek
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
   
}

// yazdigimiz todonu submit etdikde sehifemizde gostermek

function addTodoToUI(newTodo) { // String degerini list item olarak UI'ye ekleyecek.
    /* <li class="list-group-item d-flex justify-content-between">
                             Todo 1
                             <a href = "#" class ="delete-item">
                                 <i class = "fa fa-remove"></i>
                             </a> </li> */

    // ListItem olusturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    // Link olusturma 
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));

    // Arayuze Ekleme
    listItem.appendChild(link);
    todoList.appendChild(listItem);

    todoInput.value = "";

}
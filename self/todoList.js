const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todoList");

const TODO_LS = "todoList";
let todos = [];

function saveTodo(list){
	localStorage.setItem(TODO_LS, JSON.stringify(list));
}

function deleteTodo(event){
	const button = event.target;
	const li = button.parentNode;
	todoList.removeChild(li);
	
	const cleanTodo = todos.filter(function(todo){
		return todo.id !== parseInt(li.id);
	})
	
	todos = cleanTodo;
	saveTodo(todos);
}


function paintTodo(text){
	const li = document.createElement("li");
	const delBtn = document.createElement("span");
	const span = document.createElement("span");
	const newId = todos.length + 1;
	
	
	li.id = newId;
	li.appendChild(delBtn);
	li.appendChild(span);
	todoList.appendChild(li);
	delBtn.id = "delBtn";
	
	span.innerHTML = ` ${text}`;
	delBtn.innerHTML = "❌ ";
	delBtn.addEventListener("click", deleteTodo);
	
	const todoObj = {
		text: text,
		id: newId
	}
	todos.push(todoObj);
	saveTodo(todos);
}

function handleSubmit(event){
	event.preventDefault();
	const todo = todoInput.value;
	todoInput.value = "";
	paintTodo(todo);
}

function loadedTodo(){
	const loadTodo = localStorage.getItem(TODO_LS);
	if(loadTodo !== null){
		parsedTodo = JSON.parse(loadTodo);
		parsedTodo.forEach(function(todo){
			paintTodo(todo.text);			
		})			
	}
	
}

function init(){
	loadedTodo();
	todoForm.addEventListener("submit", handleSubmit);
}

init();
























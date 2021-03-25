const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING = "showing";

function saveName(userName){
	localStorage.setItem(USER_LS, userName);
}

function paintGreetings(userName){
	greetings.classList.add(SHOWING);
	greetings.innerHTML = `HELLO ${userName}`;
}

function handleSubmit(event){
	event.preventDefault();
	const userName = input.value;
	form.classList.remove(SHOWING);
	paintGreetings(userName);
	
	saveName(userName);
}

function loadName(){
	const currentUser = localStorage.getItem(USER_LS);
	if(currentUser === null){
		form.classList.add(SHOWING);
		form.addEventListener("submit", handleSubmit);
	}else{
		paintGreetings(currentUser);
	}
}

function init(){
	loadName();
}

init();

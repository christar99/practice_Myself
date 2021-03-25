const weather = document.querySelector(".js-weather");
const API_KEY = "f15b0961f270787c54497ad81c3eea5d";
const COORDS = "coords";

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lon){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
		.then(function(response){
			return response.json();
		}).then(function(json){
			weather.innerHTML =`${json.main.temp} ℃ @ ${json.name}`;
		})
}

function handleGeoSuccess(position){
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	
	const coordsObj = {
		lat,
		lon
	}
	saveCoords(coordsObj);
	
	getWeather(lat, lon);
}

function handleGeoError(){
	console.log("에러발생");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	
	if(loadedCoords === null){
		askForCoords();
	} else{
		parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.lat, parsedCoords.lon);
	}
}

function init(){
	loadCoords();
}

init();
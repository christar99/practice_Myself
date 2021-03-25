const body = document.querySelector("body");

const IMG_NUMBER = 8;


function paintImg(randomNumber){
	const img = new Image();
	img.classList.add("bgImage");
	img.src = `../images/${randomNumber + 1}.jpg`
	body.appendChild(img);
}

function genRandom(){
	return Math.floor(Math.random() * IMG_NUMBER);
}

function init(){
	const random = genRandom();
	paintImg(random);
}

init();
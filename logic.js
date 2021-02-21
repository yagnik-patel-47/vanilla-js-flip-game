"use strict";

const gameContainer = document.querySelector("#gameContainer");
const imgContainer = document.querySelector("#imgContainer");
const resultContainer = document.querySelector("#resultContainer");
const resultText = document.querySelector("#result");
const restartBtn = document.querySelector("#restart")

function createImgs() {
	let imgArr = [];
	const choices = ["ninja", "player", "coder", "ninja", "player", "coder"];
	let randomisedChoice = shuffleArray(choices);
	for (let i = 0; i < 6; i++) {
		const parentDiv = document.createElement("div");
		const img = document.createElement("img");
		parentDiv.appendChild(img);
		imgArr.push(parentDiv);
	}
	let str;
	imgArr.forEach((eachDiv, i) => {
		eachDiv.firstElementChild.setAttribute("src", `img/${randomisedChoice[i]}.svg`);
		eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
		eachDiv.firstElementChild.setAttribute("class", "w-1/2 m-3 opacity-0 transition duration-500");
		eachDiv.classList.add("for-select");
		imgContainer.appendChild(eachDiv);
	})
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array
}

createImgs();

const imgs = document.querySelectorAll(".for-select img");
let targetData = null;
imgs.forEach(img => {
	img.addEventListener("click", () => {
		img.classList.remove("opacity-0");
		img.parentElement.style.background = "initial";
		results(img)
		if (targetData === null) {
			targetData = img.getAttribute("data-choice");
		}
	})
})

let chances = 2;

function results(img) {
	if (targetData && targetData === img.getAttribute("data-choice")) {
		if (resultText.innerText !== "Losser🖕🏻") {
			resultText.innerText = "Winner🏆";
			resultText.classList.add("animate-bounce");
		}
		restartBtn.classList.replace("opacity-0", "opacity-100");
		restartBtn.classList.add("transform", "translate-y-4");
	} else {
		chances = chances - 1;
	}
	
	if (chances === 0) {
		if (resultText.innerText !== "Winner🏆") {
			resultText.innerText = "Losser🖕🏻";
			resultText.classList.add("animate-bounce");
		}
		restartBtn.classList.replace("opacity-0", "opacity-100");
		restartBtn.classList.add("transform", "translate-y-4");
	}
} 

restartBtn.addEventListener("click", () => {
	location.reload();
})
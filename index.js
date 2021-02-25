"use strict";

const imgContainer = document.querySelector("#imgContainer");
const resultText = document.querySelector("#result");
const restartBtn = document.querySelector("#restart");
const modal = document.querySelector(".emptyTaskModal");
const usernameBlock = document.querySelector("#side-nav .user-name");
const userMoneyBlock = document.querySelector("#userMoney");
const hamBurger = document.querySelector(".ham-burger");
const sideNav = document.querySelector("#side-nav");
const burgers = document.querySelectorAll(".burger");

//document.styleSheets[0].cssRules[0].style.backgroundColor= 'red';

document.addEventListener("DOMContentLoaded", getUserData);
window.addEventListener("load", () => {
	document.querySelector(".loaderbg").style.opacity = "0";
	document.querySelector(".loaderbg").style.visibility = "hidden";
	document.querySelector(".loaderbg").style.pointerEvents = "none";
});

hamBurger.addEventListener("click", () => {
	sideNav.classList.toggle("side-nav-showed");
	if (sideNav.classList.contains("side-nav-showed")) {
		burgers.forEach(burger => {
			burger.style.background = "fff";
		});
	} else {
		
	}
});
const choices = ["ninja", "player", "coder", "ninja", "player", "coder"];
let imgArr = [];
for (let i = 0; i < 6; i++) {
	const parentDiv = document.createElement("div");
	const img = document.createElement("img");
	parentDiv.appendChild(img);
	imgArr.push(parentDiv);
}
let randomisedChoice = shuffleArray(choices);
function createImgs() {
	imgArr.forEach((eachDiv, i) => {
		eachDiv.firstElementChild.setAttribute("src", `img/${randomisedChoice[i]}.svg`);
		eachDiv.firstElementChild.style.zIndex = "3";
		eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
		eachDiv.firstElementChild.setAttribute("class", "w-1/2 xl:w-1/3 m-3 2xl:w-1/3 lg:w-1/3 opacity-0 transition duration-500");
		eachDiv.classList.add("for-select");
		imgContainer.appendChild(eachDiv);
	});
}

function createModal(modalText, inputDisplay, btnDisplay, btnText, onClickDisappear) {
	modal.classList.remove("hidden-modal");
	const modalPara = document.createElement("p");
	const modalInput = document.createElement("input");
	const modalBtn = document.createElement("button");
	modalPara.innerText = modalText;
	modalInput.style.margin = "2rem 0";
	modalInput.style.display = inputDisplay;
	modalBtn.style.display = btnDisplay;
	modalBtn.classList.add("modal-btn");
	modalBtn.innerText = btnText;
	modal.classList.add("getIn");
	modal.style.backdropFilter = "blur(4px) brightness(0.7)";
	modal.appendChild(modalPara);
	modal.appendChild(modalInput);
	modal.appendChild(modalBtn);
	if (btnDisplay !== "none" || "") {
		modalBtn.addEventListener("click", () => {
			if (onClickDisappear === true) {
				modal.classList.replace("getIn", "getOut");
				modal.addEventListener("animationend", () => {
					modal.classList.add("hidden-modal");
				});
			}
		});
	}
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

createImgs();

let chances = 1;
let targetData = null;

const divs = document.querySelectorAll(".for-select");
divs.forEach(div => {
	div.addEventListener("click", () => {
		clickFx(div);
	});
});

function clickFx(img) {
	img.firstElementChild.classList.remove("opacity-0");
	img.style.background = "initial";
	img.style.transition = "all .7s ease-in";
	if (!img.firstElementChild.classList.contains("transition")) {
		img.firstElementChild.classList.add("transition", "duration-500");
	}
	let needImg = img.firstElementChild;
	if (targetData === null) {
		targetData = img;
	}
	results(needImg);
}

function results(img) {
	if (chances < 2 && chances > 0) {
		if (img.parentElement !== targetData) {
			if (img.getAttribute("data-choice") === targetData.firstElementChild.getAttribute("data-choice")) {
				if (resultText.innerText !== "Losser🖕🏻") {
					resultText.innerText = "Winner🏆";
					resultText.classList.add("animate-bounce");
				}
				restartBtn.classList.replace("opacity-0", "opacity-100");
				restartBtn.classList.add("transform", "translate-y-4");
				let userData = JSON.parse(localStorage.getItem("flipData"));
				let money = userData.money;
				money++;
				setMoney(userData, money);
				userMoneyBlock.innerText = `${userData.money}$`
			}
			chances = chances - 1;
		}
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
	randomisedChoice = shuffleArray(choices);
	imgArr.forEach((eachDiv, i) => {
		eachDiv.style.transition = "none";
		eachDiv.firstElementChild.classList.remove("transition", "duration-500");
		eachDiv.firstElementChild.setAttribute("src", `img/${randomisedChoice[i]}.svg`);
		eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
		eachDiv.firstElementChild.classList.add("opacity-0");
		eachDiv.style.background = "linear-gradient(to bottom right, #059669, #34D399)";
	});
	chances = 1;
	resultText.innerText = "Click on any one";
	targetData = null;
	restartBtn.classList.replace("opacity-100", "opacity-0");
	restartBtn.classList.remove("transform", "translate-y-4");
	resultText.classList.remove("animate-bounce");
});

function setUserData(userData, value) {
	userData.name = value; 
	localStorage.setItem("flipData", JSON.stringify(userData));
}

function setMoney(userData, value) {
	userData.money = value;
	localStorage.setItem("flipData", JSON.stringify(userData));
}

function getUserData() {
	let userData;
	if (localStorage.getItem("flipData") === null) {
		userData = {};
		createModal("Your Name?", "block", "block", "Confirm", false);
		document.querySelector(".emptyTaskModal button").addEventListener("click", () => {
			if (document.querySelector(".emptyTaskModal input").value !== "") {
				let needName = document.querySelector(".emptyTaskModal input").value;
				setUserData(userData, needName);
				setMoney(userData, 0);
				modal.classList.replace("getIn", "getOut");
				modal.addEventListener("animationend", () => {
					modal.classList.add("hidden-modal");
				});
				usernameBlock.innerText = needName;
			} else {
				document.querySelector(".emptyTaskModal p").innerText = "Enter Valid Name";
			}
		});
	} else {
		userData = JSON.parse(localStorage.getItem("flipData"));
		usernameBlock.innerText = userData.name;
		userMoneyBlock.innerText = `${userData.money}$`
	}
}
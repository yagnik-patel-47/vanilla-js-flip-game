"use strict";

const imgContainer = document.querySelector("#imgContainer");
const resultText = document.querySelector("#result");
const restartBtn = document.querySelector("#restart");
const modal = document.querySelector(".emptyTaskModal");
const usernameBlock = document.querySelector("#userName");
const userMoneyBlock = document.querySelector("#userMoney");

document.addEventListener("DOMContentLoaded", getUserData);

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

let chances = 2;

const imgs = document.querySelectorAll(".for-select");
let targetData = null;
imgs.forEach(img => {
	img.addEventListener("click", () => {
		targetData = clickFx(img, targetData);
		if (chances === 0) {
			if (img.firstElementChild.getAttribute("data-choice") === targetData) {
				
				console.log("hah");
			}
		}
	});
});

function clickFx(img, targetData) {
	img.firstElementChild.classList.remove("opacity-0");
	img.style.background = "initial";
	let needImg = img.firstElementChild;
	results(needImg);
	if (targetData === null) {
		targetData = img.firstElementChild.getAttribute("data-choice");
		return targetData;
	}
}

function results(img) {
	if (targetData && targetData === img.getAttribute("data-choice")) {
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
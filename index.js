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
const getHintBtn = document.querySelector("#get-hint");
const shop = document.querySelector("#shop");
const shopBtn = document.querySelector("#shop-btn");
const shopHamBurger = document.querySelector(".shop-ham-burger");
const buyBtn = document.querySelectorAll(".shop-items button");

document.addEventListener("DOMContentLoaded", getUserData);
window.addEventListener("load", () => {
	document.querySelector(".loaderbg").style.opacity = "0";
	document.querySelector(".loaderbg").style.visibility = "hidden";
	document.querySelector(".loaderbg").style.pointerEvents="none";
});

hamBurger.addEventListener("click", () => {
	sideNav.classList.toggle("side-nav-showed");
	burgers[1].classList.toggle("middle-rem");
	burgers[0].classList.toggle("top-bur");
	burgers[2].classList.toggle("bottom-bur");
});
let choices = ["ninja", "player", "coder", "ninja", "player", "coder"];
let packOrigin = "default-pack";
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
		eachDiv.firstElementChild.setAttribute("src", `img/${packOrigin}/${randomisedChoice[i]}.svg`);
		eachDiv.firstElementChild.style.zIndex = "3";
		eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
		eachDiv.firstElementChild.setAttribute("class", "w-1/2 xl:w-1/3 m-3 2xl:w-1/3 lg:w-1/3 opacity-0 transition duration-500");
		eachDiv.classList.add("for-select");
		imgContainer.appendChild(eachDiv);
	});
}

function createModal(modalText, inputDisplay, btnDisplay, btnText, sureBtnDisplay, sureBtnText) {
	modal.classList.remove("hidden-modal");
	const modalPara = document.createElement("p");
	const modalInput = document.createElement("input");
	const modalBtn = document.createElement("button");
	const modalSureBtn = document.createElement("button");
	modalPara.innerText = modalText;
	modalInput.style.margin = "1rem 0";
	modalPara.style.margin = "1rem 0";
	modalBtn.style.margin = "1rem 0";
	modalSureBtn.classList.add("sure-btn");
	modalBtn.classList.add("normal-btn");
	modalInput.style.display = inputDisplay;
	modalBtn.style.display = btnDisplay;
	modalSureBtn.style.display = sureBtnDisplay;
	modalBtn.classList.add("modal-btn");
	modalBtn.innerText = btnText;
	modalSureBtn.innerText = sureBtnText;
	modal.classList.add("getIn");
	modal.appendChild(modalPara);
	modal.appendChild(modalInput);
	modal.appendChild(modalBtn);
	modal.appendChild(modalSureBtn);
	modal.removeEventListener("animationend", fadeOutModal, true);
	modal.addEventListener("animationstart", () => {
		modalSureBtn.style.pointerEvents = "none";
		modalBtn.style.pointerEvents = "none";
	});
	modal.addEventListener("animationend", () => {
		modalSureBtn.style.pointerEvents = "all";
		modalBtn.style.pointerEvents = "all";
	});
	if (btnDisplay !== "none" || "") {
		modalBtn.addEventListener("click", () => {
			modal.classList.replace("getIn", "getOut");
			modal.addEventListener("animationend", fadeOutModal, true);
		});
	} if (sureBtnDisplay !== "none" || "") {
		modalSureBtn.addEventListener("click", () => {
			modal.classList.replace("getIn", "getOut");
			modal.addEventListener("animationend", fadeOutModal, true);
		});
	}
}

function fadeOutModal() {
	modal.classList.add("hidden-modal");
	[].forEach.call(modal.children, child => {
  	setTimeout(function() {
  		child.remove();
  	}, 10);
	});
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

function updateStuff() {
	randomisedChoice = shuffleArray(choices);
	imgArr.forEach((eachDiv, i) => {
		eachDiv.firstElementChild.setAttribute("src", `img/${packOrigin}/${randomisedChoice[i]}.svg`);
		eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
	});
}

setTimeout(function() {
	updateStuff();
}, 10);

let chances = 1;
let targetData = null;
let hintUsed = false;

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
	divs.forEach(child => {
		if (child.firstElementChild.nextElementSibling && child.firstElementChild.nextElementSibling.classList.contains("hint-text")) {
			child.firstElementChild.nextElementSibling.remove();
		}
	});
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
				if (hintUsed) {
					setMoney(money);
				} else {
					money++;
					setMoney(money);
				}
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
		restartBtn.classList.remove("pointer-events-none");
		restartBtn.classList.add("transform", "translate-y-4");
	}
}

restartBtn.addEventListener("click", () => {
	randomisedChoice = shuffleArray(choices);
	imgArr.forEach((eachDiv, i) => {
		eachDiv.style.transition = "none";
		eachDiv.firstElementChild.classList.remove("transition", "duration-500");
		eachDiv.firstElementChild.setAttribute("src", `img/${packOrigin}/${randomisedChoice[i]}.svg`);
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
	restartBtn.classList.add("pointer-events-none");
	hintUsed = false;
});

function setUserData(userData, value) {
	userData.name = value; 
	localStorage.setItem("flipData", JSON.stringify(userData));
}

function setMoney(value) {
	let userData = JSON.parse(localStorage.getItem("flipData"));
	userData.money = value;
	localStorage.setItem("flipData", JSON.stringify(userData));
}

function setIconPack(value) {
	let userData = JSON.parse(localStorage.getItem("flipData"));
	userData.iconPack = value;
	localStorage.setItem("flipData", JSON.stringify(userData));
}

function getUserData() {
	let userData;
	if (localStorage.getItem("flipData") === null) {
		userData = {};
		createModal("Your Name?", "block", "block", "Confirm", "none", "");
		document.querySelector(".emptyTaskModal button").addEventListener("click", () => {
			if (document.querySelector(".emptyTaskModal input").value !== "") {
				let needName = document.querySelector(".emptyTaskModal input").value;
				setUserData(userData, needName);
				setMoney(0);
				setIconPack("superhero-pack");
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
		packOrigin = userData.iconPack;
		usernameBlock.innerText = userData.name;
		userMoneyBlock.innerText = `${userData.money}$`;
		if (packOrigin === "default-pack") {
			choices = ["ninja", "player", "coder", "ninja", "player", "coder"];
		} else if (packOrigin === "technology-pack") {
			choices = ["satellite", "dish-tec", "router", "satellite", "dish-tec", "router"];
		} else if (packOrigin === "fruits-pack") {
			choices = ["tomato", "orange", "strawberry", "tomato", "orange", "strawberry"];
		} else if (packOrigin === "superhero-pack") {
			choices = ["deadpool", "spiderman", "wolverine", "deadpool", "spiderman", "wolverine"];
		} else if (packOrigin === "flower-pack") {
			choices = ["hibiscus", "lotus", "rose", "hibiscus", "lotus", "rose"];
		} else if (packOrigin === "christmas-pack") {
			choices = ["santa", "snowman", "chris-tree", "santa", "snowman", "chris-tree"];
		} else if (packOrigin === "musicInstrument-pack") {
			choices = ["drum", "guitar", "maracas", "drum", "guitar", "maracas"];
		}
	}
}

let canGetHint;

function hintGetable() {
	if (targetData !== null && restartBtn.classList.contains("opacity-0")) {
		canGetHint = true;
	} else {
		canGetHint = false;
	}
}

setInterval(hintGetable, 100);

let needHint;

function getHintCard() {
	divs.forEach(div => {
		if (div !== targetData && div.firstElementChild.getAttribute("data-choice") === targetData.firstElementChild.getAttribute("data-choice")) {
			needHint = div;
		}
	});
}

function getHint() {
	getHintCard();
	let hint = document.createElement("p");
	hint.innerText = "click here";
	hint.classList.add("hint-text");
	needHint.appendChild(hint);
}

getHintBtn.addEventListener("click", () => {
	let userData = JSON.parse(localStorage.getItem("flipData"));
	let money = userData.money;
	if (canGetHint && money > 0) {
		getHint();
		hintUsed = true;
		money--;
		setMoney(money);
	} else if (money < 1) {
		createModal("Didn't have sufficient money", "none", "block", "Ok", "none", "");
	} else {
		if (targetData === null) {
			createModal("Plz Flip First Card.", "none", "block", "Ok", "none", "");
		} else if (!restartBtn.classList.contains("opacity-0")) {
			createModal("Plz restart the game.", "none", "block", "Ok", "none", "");
		}
	}
	sideNav.classList.remove("side-nav-showed");
	burgers[1].classList.remove("middle-rem");
	burgers[0].classList.remove("top-bur");
	burgers[2].classList.remove("bottom-bur");
});

shopHamBurger.addEventListener("click", () => {
	shop.style.display = "none";
});

shop.style.display = "none";

shopBtn.addEventListener("click", () => {
	shop.style.display = "grid";
	sideNav.classList.remove("side-nav-showed");
	burgers[1].classList.remove("middle-rem");
	burgers[0].classList.remove("top-bur");
	burgers[2].classList.remove("bottom-bur");
});

buyBtn.forEach(btn => {
	btn.addEventListener("click", () => {
		let userData = JSON.parse(localStorage.getItem("flipData"));
		const price = btn.getAttribute("data-price");
		let money = userData.money;
		if (packOrigin === btn.parentElement.firstElementChild.getAttribute("data-pack")) {
			createModal("You already have same pack!", "none", "block", "Ok", "none", "");
		} else if (price > money) {
			createModal("You didn't have sufficient money", "none", "block", "Ok", "none", "");
		} else {
			if (userData.money > price) {
				createModal("Sure?", "none", "block", "No!", "block", "Yes.");
				document.querySelector(".sure-btn").addEventListener("click", () => {
					packOrigin = btn.parentElement.firstElementChild.getAttribute("data-pack");
					setIconPack(packOrigin);
					if (packOrigin === "default-pack") {
						choices = ["ninja", "player", "coder", "ninja", "player", "coder"];
					} else if (packOrigin === "technology-pack") {
						choices = ["satellite", "dish-tec", "router", "satellite", "dish-tec", "router"];
					} else if (packOrigin === "fruits-pack") {
						choices = ["tomato", "orange", "strawberry", "tomato", "orange", "strawberry"];
					} else if (packOrigin === "superhero-pack") {
						choices = ["deadpool", "spiderman", "wolverine", "deadpool", "spiderman", "wolverine"];
					} else if (packOrigin === "flower-pack") {
						choices = ["hibiscus", "lotus", "rose", "hibiscus", "lotus", "rose"];
					} else if (packOrigin === "christmas-pack") {
						choices = ["santa", "snowman", "chris-tree", "santa", "snowman", "chris-tree"];
					} else if (packOrigin === "musicInstrument-pack") {
						choices = ["drum", "guitar", "maracas", "drum", "guitar", "maracas"];
					}
					updateStuff();
					money = money - price;
					setMoney(money);
					userMoneyBlock.innerText = `${userData.money}$`;
				});
			}
		}
	});
});
"use strict";

// Variables //
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
const changeNameBtn = document.querySelector("#change-name");

// Startup Functions //
document.addEventListener("DOMContentLoaded", getUserData);
window.addEventListener("load", () => {
  document.querySelector(".loaderbg").style.opacity = "0";
  document.querySelector(".loaderbg").style.visibility = "hidden";
  document.querySelector(".loaderbg").style.pointerEvents = "none";
});

// hamBurger Menu Handling //
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

// Creating Card Of Images Dynamically //
function createImgs() {
  imgArr.forEach((eachDiv, i) => {
    eachDiv.firstElementChild.setAttribute(
      "src",
      `img/${packOrigin}/${randomisedChoice[i]}.svg`
    );
    eachDiv.firstElementChild.style.zIndex = "3";
    eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
    eachDiv.firstElementChild.setAttribute(
      "class",
      "w-3/4 lg:w-1/3 xl:w-1/4 m-3 opacity-0 transition duration-500 cardImg"
    );
    eachDiv.classList.add("for-select");
    imgContainer.appendChild(eachDiv);
  });
}

// Page Madal Handling //
function createModal(
  modalText,
  inputDisplay,
  btnDisplay,
  btnText,
  sureBtnDisplay,
  sureBtnText,
  topShift = 0.1
) {
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
  modalPara.classList.add("getIn");
  modalInput.classList.add("getIn");
  modalBtn.classList.add("getIn");
  modalSureBtn.classList.add("getIn");
  modal.appendChild(modalPara);
  modal.appendChild(modalInput);
  modal.appendChild(modalBtn);
  modal.appendChild(modalSureBtn);
  modal.removeEventListener("animationend", fadeOutModal, true);
  modalPara.addEventListener("animationstart", () => {
    modalSureBtn.style.pointerEvents = "none";
    modalBtn.style.pointerEvents = "none";
  });
  modal.addEventListener("animationend", () => {
    modalSureBtn.style.pointerEvents = "all";
    modalBtn.style.pointerEvents = "all";
  });
  if (btnDisplay !== "none" || "") {
    modalBtn.addEventListener("click", () => {
      modalPara.classList.replace("getIn", "getOut");
      modalInput.classList.replace("getIn", "getOut");
      modalBtn.classList.replace("getIn", "getOut");
      modalSureBtn.classList.replace("getIn", "getOut");
      modalPara.addEventListener("animationend", fadeOutModal, true);
    });
  }
  if (sureBtnDisplay !== "none" || "") {
    modalSureBtn.addEventListener("click", () => {
      modalPara.classList.replace("getIn", "getOut");
      modalInput.classList.replace("getIn", "getOut");
      modalBtn.classList.replace("getIn", "getOut");
      modalSureBtn.classList.replace("getIn", "getOut");
      modalPara.addEventListener("animationend", fadeOutModal, true);
    });
  }
  if (topShift !== 0.1) {
    modal.style.top = `${topShift}px`;
  }
}

function fadeOutModal() {
  modal.classList.add("hidden-modal");
  [].forEach.call(modal.children, (child) => {
    setTimeout(function () {
      child.remove();
    }, 10);
  });
}

// Algorithm For Shuffle An Choice Array //
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

// Updata Card On Restart //
function updateStuff() {
  choices = getPack(packOrigin);
  randomisedChoice = shuffleArray(choices);
  imgArr.forEach((eachDiv, i) => {
    eachDiv.firstElementChild.setAttribute(
      "src",
      `./img/${packOrigin}/${randomisedChoice[i]}.svg`
    );
    eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
  });
}

setTimeout(function () {
  updateStuff();
}, 10);

let chances = 1;
let firstCard = null;
let hintUsed = false;

const divs = document.querySelectorAll(".for-select");
divs.forEach((div) => {
  div.addEventListener("click", () => {
    clickFx(div);
  });
});

// Handling Card Click //
function clickFx(img) {
  img.firstElementChild.classList.remove("opacity-0");
  img.style.background = "initial";
  img.style.transition = "all .7s ease-in";
  if (!img.firstElementChild.classList.contains("transition")) {
    img.firstElementChild.classList.add("transition", "duration-500");
  }
  divs.forEach((child) => {
    if (
      child.firstElementChild.nextElementSibling &&
      child.firstElementChild.nextElementSibling.classList.contains("hint-text")
    ) {
      child.firstElementChild.nextElementSibling.remove();
    }
  });
  let needImg = img.firstElementChild;
  if (firstCard === null) {
    firstCard = img;
  }
  results(needImg);
}

// Results on turn over //
function results(img) {
  if (chances < 2 && chances > 0) {
    if (img.parentElement !== firstCard) {
      if (
        img.getAttribute("data-choice") ===
        firstCard.firstElementChild.getAttribute("data-choice")
      ) {
        if (resultText.innerText !== "Losser🖕") {
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
        userMoneyBlock.innerText = `${money}$`;
      }
      chances = chances - 1;
    }
  }

  if (chances === 0) {
    if (resultText.innerText !== "Winner🏆") {
      resultText.innerText = "Losser🖕";
      resultText.classList.add("animate-bounce");
    }
    restartBtn.classList.replace("opacity-0", "opacity-100");
    restartBtn.classList.remove("pointer-events-none");
    restartBtn.classList.add("transform", "translate-y-4");
  }
}

// Restart Button Handling //
restartBtn.addEventListener("click", () => {
  randomisedChoice = shuffleArray(choices);
  imgArr.forEach((eachDiv, i) => {
    eachDiv.style.transition = "none";
    eachDiv.firstElementChild.classList.remove("transition", "duration-500");
    eachDiv.firstElementChild.setAttribute(
      "src",
      `img/${packOrigin}/${randomisedChoice[i]}.svg`
    );
    eachDiv.firstElementChild.setAttribute("data-choice", randomisedChoice[i]);
    eachDiv.firstElementChild.classList.add("opacity-0");
    eachDiv.style.background =
      "linear-gradient(to bottom right, #059669, #34D399)";
  });
  chances = 1;
  resultText.innerText = "Click on any one";
  firstCard = null;
  restartBtn.classList.replace("opacity-100", "opacity-0");
  restartBtn.classList.remove("transform", "translate-y-4");
  resultText.classList.remove("animate-bounce");
  restartBtn.classList.add("pointer-events-none");
  hintUsed = false;
});

// Saving Data In localStorage //
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

// Image Pack For Player //
function getPack(pack) {
  if (pack === "default-pack") {
    return ["ninja", "player", "coder", "ninja", "player", "coder"];
  } else if (pack === "technology-pack") {
    return [
      "satellite",
      "dish-tec",
      "router",
      "satellite",
      "dish-tec",
      "router",
    ];
  } else if (pack === "fruits-pack") {
    return ["tomato", "orange", "strawberry", "tomato", "orange", "strawberry"];
  } else if (pack === "superhero-pack") {
    return [
      "deadpool",
      "spiderman",
      "wolverine",
      "deadpool",
      "spiderman",
      "wolverine",
    ];
  } else if (pack === "flower-pack") {
    return ["hibiscus", "lotus", "rose", "hibiscus", "lotus", "rose"];
  } else if (pack === "christmas-pack") {
    return ["santa", "snowman", "chris-tree", "santa", "snowman", "chris-tree"];
  } else if (pack === "musicInstrument-pack") {
    return ["drum", "guitar", "maracas", "drum", "guitar", "maracas"];
  } else {
    alert("Image Pack Problem");
  }
}

// Getting Saved Data From localStorage //
function getUserData() {
  let userData;
  if (localStorage.getItem("flipData") === null) {
    userData = {};
    createModal("Your Name?", "block", "block", "Confirm", "none", "");
    document
      .querySelector(".emptyTaskModal button")
      .addEventListener("click", () => {
        if (document.querySelector(".emptyTaskModal input").value !== "") {
          let needName = document.querySelector(".emptyTaskModal input").value;
          setUserData(userData, needName);
          setMoney(0);
          setIconPack("superhero-pack");
          packOrigin = JSON.parse(localStorage.getItem("flipData")).iconPack;
          updateStuff();
          modal.classList.replace("getIn", "getOut");
          modal.addEventListener("animationend", () => {
            modal.classList.add("hidden-modal");
          });
          usernameBlock.innerText = needName;
        } else {
          document.querySelector(".emptyTaskModal p").innerText =
            "Enter Valid Name";
        }
      });
  } else {
    userData = JSON.parse(localStorage.getItem("flipData"));
    packOrigin = userData.iconPack;
    usernameBlock.innerText = userData.name;
    userMoneyBlock.innerText = `${userData.money}$`;
    choices = getPack(packOrigin);
  }
}

let canGetHint;

// Able To Take Hint Or Not? //
function hintGetable() {
  if (firstCard !== null && restartBtn.classList.contains("opacity-0")) {
    canGetHint = true;
  } else {
    canGetHint = false;
  }
}

setInterval(hintGetable, 100);

let needHint;

function getHintCard() {
  divs.forEach((div) => {
    if (
      div !== firstCard &&
      div.firstElementChild.getAttribute("data-choice") ===
        firstCard.firstElementChild.getAttribute("data-choice")
    ) {
      needHint = div;
    }
  });
}

// Giving Hint //
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
  const topShift = window.pageYOffset;
  if (canGetHint && money > 0) {
    getHint();
    hintUsed = true;
    money--;
    setMoney(money);
  } else if (money < 1) {
    createModal(
      "Didn't have sufficient money",
      "none",
      "block",
      "Ok",
      "none",
      "",
      topShift
    );
  } else {
    if (firstCard === null) {
      createModal(
        "Plz Flip First Card.",
        "none",
        "block",
        "Ok",
        "none",
        "",
        topShift
      );
    } else if (!restartBtn.classList.contains("opacity-0")) {
      createModal(
        "Plz restart the game.",
        "none",
        "block",
        "Ok",
        "none",
        "",
        topShift
      );
    }
  }
  sideNav.classList.remove("side-nav-showed");
  burgers[1].classList.remove("middle-rem");
  burgers[0].classList.remove("top-bur");
  burgers[2].classList.remove("bottom-bur");
});

// Shop hamBurger Menu Controll //
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

buyBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let userData = JSON.parse(localStorage.getItem("flipData"));
    const price = btn.getAttribute("data-price");
    let money = userData.money;
    const topShift = window.pageYOffset;
    if (
      packOrigin ===
      btn.parentElement.firstElementChild.getAttribute("data-pack")
    ) {
      createModal(
        "You already have same pack!",
        "none",
        "block",
        "Ok",
        "none",
        "",
        topShift
      );
    } else if (price > money) {
      createModal(
        "You don't have sufficient money",
        "none",
        "block",
        "Ok",
        "none",
        "",
        topShift
      );
    } else {
      if (userData.money > price) {
        createModal("Sure?", "none", "block", "No!", "block", "Yes.", topShift);
        document.querySelector(".sure-btn").addEventListener("click", () => {
          packOrigin =
            btn.parentElement.firstElementChild.getAttribute("data-pack");
          setIconPack(packOrigin);
          choices = getPack(packOrigin);
          money = money - price;
          setMoney(money);
          updateStuff();
          userMoneyBlock.innerText = `${money}$`;
        });
      }
    }
  });
});

// Change Name Function //
changeNameBtn.addEventListener("click", () => {
  createModal("Enter New Name", "block", "block", "Submit", "none", "");
  sideNav.classList.remove("side-nav-showed");
  burgers[1].classList.remove("middle-rem");
  burgers[0].classList.remove("top-bur");
  burgers[2].classList.remove("bottom-bur");
  document.querySelector(".modal-btn").addEventListener("click", () => {
    let newName = document.querySelector(".emptyTaskModal input").value;
    usernameBlock.innerText = newName;
    setUserData(JSON.parse(localStorage.getItem("flipData")), newName);
  });
});

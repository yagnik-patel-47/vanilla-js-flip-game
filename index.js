"use strict";const imgContainer=document.querySelector("#imgContainer"),resultText=document.querySelector("#result"),restartBtn=document.querySelector("#restart"),modal=document.querySelector(".emptyTaskModal"),usernameBlock=document.querySelector("#side-nav .user-name"),userMoneyBlock=document.querySelector("#userMoney"),hamBurger=document.querySelector(".ham-burger"),sideNav=document.querySelector("#side-nav"),burgers=document.querySelectorAll(".burger"),getHintBtn=document.querySelector("#get-hint");document.addEventListener("DOMContentLoaded",getUserData),window.addEventListener("load",()=>{document.querySelector(".loaderbg").style.opacity="0",document.querySelector(".loaderbg").style.visibility="hidden",document.querySelector(".loaderbg").style.pointerEvents="none"}),hamBurger.addEventListener("click",()=>{sideNav.classList.toggle("side-nav-showed"),burgers[1].classList.toggle("middle-rem"),burgers[0].classList.toggle("top-bur"),burgers[2].classList.toggle("bottom-bur")});const choices=["ninja","player","coder","ninja","player","coder"];let imgArr=[];for(let e=0;e<6;e++){const e=document.createElement("div"),t=document.createElement("img");e.appendChild(t),imgArr.push(e)}let randomisedChoice=shuffleArray(choices);function createImgs(){imgArr.forEach((e,t)=>{e.firstElementChild.setAttribute("src",`img/${randomisedChoice[t]}.svg`),e.firstElementChild.style.zIndex="3",e.firstElementChild.setAttribute("data-choice",randomisedChoice[t]),e.firstElementChild.setAttribute("class","w-1/2 xl:w-1/3 m-3 2xl:w-1/3 lg:w-1/3 opacity-0 transition duration-500"),e.classList.add("for-select"),imgContainer.appendChild(e)})}function createModal(e,t,n,a){modal.classList.remove("hidden-modal");const r=document.createElement("p"),i=document.createElement("input"),s=document.createElement("button");r.innerText=e,i.style.margin="1rem 0",r.style.margin="1rem 0",s.style.margin="1rem 0",i.style.display=t,s.style.display=n,s.classList.add("modal-btn"),s.innerText=a,modal.classList.add("getIn"),modal.appendChild(r),modal.appendChild(i),modal.appendChild(s),modal.removeEventListener("animationend",fadeOutModal,!0),"none"!==n&&s.addEventListener("click",()=>{modal.classList.replace("getIn","getOut"),modal.addEventListener("animationend",fadeOutModal,!0)})}function fadeOutModal(){modal.classList.add("hidden-modal"),modal.children.forEach(e=>{modal.removeChild(e)})}function shuffleArray(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1)),a=e[t];e[t]=e[n],e[n]=a}return e}createImgs();let chances=1,targetData=null,hintUsed=!1;const divs=document.querySelectorAll(".for-select");function clickFx(e){e.firstElementChild.classList.remove("opacity-0"),e.style.background="initial",e.style.transition="all .7s ease-in",e.firstElementChild.classList.contains("transition")||e.firstElementChild.classList.add("transition","duration-500"),divs.forEach(e=>{e.firstElementChild.nextElementSibling&&e.firstElementChild.nextElementSibling.classList.contains("hint-text")&&e.firstElementChild.nextElementSibling.remove()});let t=e.firstElementChild;null===targetData&&(targetData=e),results(t)}function results(e){if(chances<2&&chances>0&&e.parentElement!==targetData){if(e.getAttribute("data-choice")===targetData.firstElementChild.getAttribute("data-choice")){"Losser🖕🏻"!==resultText.innerText&&(resultText.innerText="Winner🏆",resultText.classList.add("animate-bounce")),restartBtn.classList.replace("opacity-0","opacity-100"),restartBtn.classList.add("transform","translate-y-4");let e=JSON.parse(localStorage.getItem("flipData")),t=e.money;setMoney(e,hintUsed?t:++t),userMoneyBlock.innerText=`${e.money}$`}chances-=1}0===chances&&("Winner🏆"!==resultText.innerText&&(resultText.innerText="Losser🖕🏻",resultText.classList.add("animate-bounce")),restartBtn.classList.replace("opacity-0","opacity-100"),restartBtn.classList.remove("pointer-events-none"),restartBtn.classList.add("transform","translate-y-4"))}function setUserData(e,t){e.name=t,localStorage.setItem("flipData",JSON.stringify(e))}function setMoney(e,t){e.money=t,localStorage.setItem("flipData",JSON.stringify(e))}function getUserData(){let e;null===localStorage.getItem("flipData")?(e={},createModal("Your Name?","block","block","Confirm"),document.querySelector(".emptyTaskModal button").addEventListener("click",()=>{if(""!==document.querySelector(".emptyTaskModal input").value){let t=document.querySelector(".emptyTaskModal input").value;setUserData(e,t),setMoney(e,0),modal.classList.replace("getIn","getOut"),modal.addEventListener("animationend",()=>{modal.classList.add("hidden-modal")}),usernameBlock.innerText=t}else document.querySelector(".emptyTaskModal p").innerText="Enter Valid Name"})):(e=JSON.parse(localStorage.getItem("flipData")),usernameBlock.innerText=e.name,userMoneyBlock.innerText=`${e.money}$`)}let canGetHint,needHint;function hintGetable(){canGetHint=!(null===targetData||!restartBtn.classList.contains("opacity-0"))}function getHintCard(){divs.forEach(e=>{e!==targetData&&e.firstElementChild.getAttribute("data-choice")===targetData.firstElementChild.getAttribute("data-choice")&&(needHint=e)})}function getHint(){getHintCard();let e=document.createElement("p");e.innerText="click here",e.classList.add("hint-text"),needHint.appendChild(e)}divs.forEach(e=>{e.addEventListener("click",()=>{clickFx(e)})}),restartBtn.addEventListener("click",()=>{randomisedChoice=shuffleArray(choices),imgArr.forEach((e,t)=>{e.style.transition="none",e.firstElementChild.classList.remove("transition","duration-500"),e.firstElementChild.setAttribute("src",`img/${randomisedChoice[t]}.svg`),e.firstElementChild.setAttribute("data-choice",randomisedChoice[t]),e.firstElementChild.classList.add("opacity-0"),e.style.background="linear-gradient(to bottom right, #059669, #34D399)"}),chances=1,resultText.innerText="Click on any one",targetData=null,restartBtn.classList.replace("opacity-100","opacity-0"),restartBtn.classList.remove("transform","translate-y-4"),resultText.classList.remove("animate-bounce"),restartBtn.classList.add("pointer-events-none"),hintUsed=!1}),setInterval(hintGetable,100),getHintBtn.addEventListener("click",()=>{let e=JSON.parse(localStorage.getItem("flipData")),t=e.money;canGetHint&&t>0?(getHint(),hintUsed=!0,setMoney(e,--t)):createModal(t<1?"Didn't have sufficient money":"Plz Flip First Card","none","block","Ok"),sideNav.classList.remove("side-nav-showed"),burgers[1].classList.remove("middle-rem"),burgers[0].classList.remove("top-bur"),burgers[2].classList.remove("bottom-bur")});
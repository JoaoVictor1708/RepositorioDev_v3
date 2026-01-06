import {myProjectsContainerArray, technicalProjects} from "./dataCards.js"
"use strict"

// toggleTheme
const toggleTheme = document.querySelector(".toggleTheme")
toggleTheme.addEventListener("click", ()=> {
    if(btnToggleMode.className === "fa-solid fa-cloud-sun"){
        btnToggleMode.className = "fa-solid fa-cloud-moon"
        document.body.className = "darkModeTheme"
        btnToggleMode.style.animationName = "toggleThemeAnimation"
        btnToggleMode.style.animationDirection = "normal"
    }
    else{
        btnToggleMode.className = "fa-solid fa-cloud-sun"
        document.body.className = "lightModeTheme"
        btnToggleMode.style.animationName = "toggleThemeAnimationReverse"
    }
})

document.addEventListener("DOMContentLoaded", ()=>{
    loadDataCards(myProjectsContainer, myProjectsContainerArray)
})

// dataCards
function loadDataCards (destiny, fileArray){
    let cardDelay = 0.2
    for(let indexCard = 0; indexCard<fileArray.length; indexCard++){
        const newCard = `
            <div class="cardProject" style="animation-delay: ${cardDelay}s" id="${fileArray[indexCard].cardId}">
                <img src="${fileArray[indexCard].imgUrl}" alt="${fileArray[indexCard].imgAlt}">
                <h3><span></span>${fileArray[indexCard].title}</h3>
            </div>
        `
        destiny.innerHTML = destiny.innerHTML + newCard
        cardDelay += 0.3
    }
}

// projectCards
const myProjectsContainer = document.querySelector("#myProjectsContainer")
loadDataCards(myProjectsContainer, myProjectsContainerArray)

myProjectsContainer.addEventListener("click", (event)=>{
    const target = event.target
    const targetId = target.closest("div").id
    expandCard(targetId, myProjectsContainerArray)
})

//Função para expandir o card
function expandCard(targetId, fileArray){
    const indexCard = targetId
    
    const bodyCardExpanded = document.createElement("div")
    bodyCardExpanded.setAttribute("class", "bodyCardExpanded")

    const cardDiv = document.createElement("div")
    cardDiv.setAttribute("class","cardExpanded")

    const cardTitle = document.createElement("h3")
    cardTitle.textContent = fileArray[indexCard].title

    const cardImg = document.createElement("img")
    cardImg.setAttribute("src", fileArray[indexCard].imgUrl)
    cardImg.setAttribute("alt", fileArray[indexCard].imgAlt)

    const cardDescription = document.createElement(`p`)
    cardDescription.textContent = fileArray[indexCard].description

    const cardClose = document.createElement("i")
    cardClose.setAttribute("class", "fa-solid fa-x")

    const cardtechnologies = document.createElement("div")
    cardtechnologies.setAttribute("class", "cardTechnologies")
    for(let indexTechnologies = 0; indexTechnologies<fileArray[indexCard].technologies.length; indexTechnologies++){
        const technolgyUsed = document.createElement("p")
        technolgyUsed.textContent = fileArray[indexCard].technologies[indexTechnologies]
        technolgyUsed.setAttribute("class",`${fileArray[indexCard].technologies[indexTechnologies]}Class`)
        cardtechnologies.append(technolgyUsed)
    }

    cardDiv.append(cardTitle)
    cardDiv.append(cardImg) 
    cardDiv.append(cardtechnologies)
    cardDiv.append(cardDescription)
    cardDiv.append(cardClose)
    bodyCardExpanded.append(cardDiv)
    document.body.append(bodyCardExpanded)
    
    bodyCardExpanded.addEventListener("click", (event)=>{
        const target = event.target
        if(target === bodyCardExpanded || target === cardClose){
            cardDiv.style.animationDuration = "0.3s"
            cardDiv.style.animationName = "desappear"
            bodyCardExpanded.style.animationDuration = "0.3s"
            bodyCardExpanded.style.animationName = "desappearV2"
            setTimeout(() => {
                cardDiv.remove()
                bodyCardExpanded.remove()
            }, 500);
            }
        })
}

// scrollSections
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const radio = document.querySelector(
        `input[type="radio"][data-section="${id}"]`
      );

      if (radio) {
        radio.checked = true;
      }
    }
    });
  },
  {
    threshold: 0.6
  }
);

const apresentationSection = document.querySelector(".apresentation")
const projectsSection = document.querySelector(".projects")
const servicesSection = document.querySelector(".services")
const formationsSection = document.querySelector(".formations")
const sections = [apresentationSection, projectsSection, servicesSection, formationsSection]
sections.forEach((section)=> observer.observe(section))

// toggleAnimationFunction
function appearDesappear (item, animation1, animation2){
    if(item.classList[1] === "divActived"){
        item.classList.remove("divActived")
        item.classList.add("divDesactived")
        item.style.animationName = animation1
    } else{
        item.classList.remove("divDesactived")
        item.classList.add("divActived")
        item.style.animationName = animation2
    }
}

//ScrollMenu
const scrollMenuBtn = document.querySelector(".scrollMenuBtn")
const scrollMenu = document.querySelector(".headerSections")

scrollMenu.classList.add("divDesactived")
scrollMenuBtn.addEventListener("click", ()=> appearDesappear(scrollMenu, "upToDown", "desappear"))

//Contacts
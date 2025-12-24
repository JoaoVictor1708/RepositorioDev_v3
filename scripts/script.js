import {dataCards} from "./dataCards.js"
"use strict"

// toggleTheme
const toggleTheme = document.querySelector(".toggleTheme")
const btnToggleMode = document.querySelector("#btnToggleMode")
btnToggleMode.addEventListener("click", ()=> {
    if(btnToggleMode.className === "fa-solid fa-cloud-sun"){
        btnToggleMode.className = "fa-solid fa-cloud-moon"
        document.body.className = "darkModeTheme"
        btnToggleMode.style.animationName = "toggleThemeAnimation"
    }
    else{
        btnToggleMode.className = "fa-solid fa-cloud-sun"
        document.body.className = "lightModeTheme"
        btnToggleMode.style.animationName = "toggleThemeAnimationReverse"
    }
})

// dataCards
document.addEventListener("DOMContentLoaded", ()=>{
    loadDataCards()
})

const scrollCards = document.querySelector(".scrollProjects")
function loadDataCards (){
    let cardDelay = 0.6
    for(let indexCard = 0; indexCard<dataCards.length; indexCard++){
        const newCard = `
            <div class="cardProject" style="animation-delay: ${cardDelay}s" id="${dataCards[indexCard].cardId}">
                <img src="${dataCards[indexCard].imgUrl}" alt="${dataCards[indexCard].imgAlt}">
                <h3><span></span>${dataCards[indexCard].title}</h3>
            </div>
        `
        scrollCards.innerHTML = scrollCards.innerHTML + newCard
        cardDelay += 0.3
    }
}

scrollCards.addEventListener("click", (event)=>{
    event.preventDefault()
    const target = event.target
    const targetId = target.closest("div").id
    expandCard(targetId)
})

function expandCard(targetId){
    const indexCard = targetId
    
    const bodyCardExpanded = document.createElement("div")
    bodyCardExpanded.setAttribute("class", "bodyCardExpanded")

    const cardDiv = document.createElement("div")
    cardDiv.setAttribute("class","cardExpanded")

    const cardTitle = document.createElement("h3")
    cardTitle.textContent = dataCards[indexCard].title

    const cardImg = document.createElement("img")
    cardImg.setAttribute("src", dataCards[indexCard].imgUrl)
    cardImg.setAttribute("alt", dataCards[indexCard].imgAlt)

    const cardDescription = document.createElement(`p`)
    cardDescription.textContent = dataCards[indexCard].description

    const cardClose = document.createElement("i")
    cardClose.setAttribute("class", "fa-solid fa-x")

    const cardtechnologies = document.createElement("div")
    cardtechnologies.setAttribute("class", "cardTechnologies")
    for(let indexTechnologies = 0; indexTechnologies<dataCards[indexCard].technologies.length; indexTechnologies++){
        const technolgyUsed = document.createElement("p")
        technolgyUsed.textContent = dataCards[indexCard].technologies[indexTechnologies]
        technolgyUsed.setAttribute("class",`${dataCards[indexCard].technologies[indexTechnologies]}Class`)
        cardtechnologies.append(technolgyUsed)
    }

    cardDiv.append(cardTitle)
    cardDiv.append(cardImg) 
    cardDiv.append(cardtechnologies)
    cardDiv.append(cardDescription)
    cardDiv.append(cardClose)
    bodyCardExpanded.append(cardDiv)
    document.body.append(bodyCardExpanded)
    
    cardClose.addEventListener("click", (event)=>{
        event.preventDefault()
        const target = event.target
        const divThatWillBeDeleted = target.closest("div")
        divThatWillBeDeleted.style.animationDuration = "0.3s"
        divThatWillBeDeleted.style.animationName = "desappear"
        bodyCardExpanded.style.animationDuration = "0.3s"
        bodyCardExpanded.style.animationName = "desappear"
        setInterval(() => {
            divThatWillBeDeleted.remove()
            bodyCardExpanded.remove()
        }, 500);
    })
}
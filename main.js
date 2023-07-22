// fetch 

document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/Plants') 
    .then(res => res.json())
    .then(plantInfo => plantInfo.forEach(plant => createPlantCard(plant)))
  
    
    
})

//making my seeds turn to flowers when i mouse over the title

let seeds = document.getElementById('seeds')

seeds.addEventListener("mouseenter", (e) =>{
  e.target.textContent = "🌷  🌷  🌷  🌷  🌷"

  setTimeout(() => {
    e.target.textContent = "🌱  🌱  🌱  🌱  🌱"
  }, 3000)
})



// getting the current date
let date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${month}-${day}-${year}`;
console.log(currentDate)



// creates plant card to keep information from json//
function createPlantCard(plant){
    let card = document.createElement('div')
        card.id = "plantCard"
        card.classList.add('plantCard')

        let h3 = document.createElement('h3')
            h3.textContent = `Plant name: ${plant.name} `

        let img = document.createElement('img')
            img.src = plant.img
            if(`${plant.img}` === "") { img.src = "https://i.pinimg.com/originals/3e/93/03/3e9303d2646cb2d84fbb763f7eedb409.jpg"}
            img.classList.add('plant-photo')

        let p = document.createElement('p')
            p.textContent = plant.info

        let p2 = document.createElement('p')
        p2.textContent =`Water on the ${plant.lastdate}`
        if(plant.lastdate === undefined) { p2.textContent = "Time to Water"}

        let p3 = document.createElement('p')
        p3.textContent =`Water every ${plant.days} days`
        if(plant.days === 1) {p3.textContent = 'Water every day'}

        let btn = document.createElement('button')
            btn.classList.add('watering')
            btn.id = plant.id
            
          if(currentDate === plant.lastdate || currentDate > plant.lastdate || plant.lastdate === undefined){
              btn.textContent = "✿✿✿"
          }else{
              btn.textContent = "🌼🌼🌼"}

          btn.addEventListener('click', () => {
              btn.textContent = "🌼🌼🌼"
              p2.textContent = `Water on the ${month}-${day + plant.days}-${year}`
            patchPlants(btn.id,plant.days)
          })
         
    card.append(h3,img,p,p2,p3,btn)
    document.getElementById('plantList').appendChild(card)
}


// creates new plant card with user input information 
// figure out how to default back to blank after submit without deleting my new cards

const form = document.querySelector("form.plant-form")
form.addEventListener("submit", (event) =>{
  const formData = Object.fromEntries(new FormData(event.target))
  addNewPlant(formData)

})


// information submited from form.plant-form
// post it in my json and add to my website

function addNewPlant(Plants){
    fetch('http://localhost:3000/Plants',{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        Accept: "application/json"
      },
  
      body:  JSON.stringify({...Plants,
        days: Number(Plants.days)
      })
    })
    .then(res => res.json())
    .then(plants => createPlantCard(plants))
}



//Patching into json so that my changes to my plant card are forever!!!

function patchPlants(id,days){
  fetch(`http://localhost:3000/Plants/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      date: currentDate,
      lastdate : `${month}-${day + days}-${year}`
    })
    
  })
  .then(res => res.json())
  .then((json) => console.log(json))
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

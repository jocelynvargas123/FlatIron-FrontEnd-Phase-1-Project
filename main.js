// fetch 
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/Plants') 
    .then(res => res.json())
    .then(plantInfo => plantInfo.forEach(plant => createPlantCard(plant)))
    
})


// getting the current date
const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let currentDate = `${month}-${day}-${year}`;
console.log(currentDate)

let time = document.getElementById("current-time")
            time.textContent = currentDate

            
// create new plant card
const addPlantButton = document.querySelector('#addPlant')
    addPlantButton.addEventListener('click', () => {
    createPlantCard()
})

// to keep track of the number of days button
// should conect to button that update current date
// count down max is value of How frequent do you want to be reminded
// turn red when number is 0
//doesnt return to default after refresh
// counts down by day that passes
// function that creates countdown for the days til zero 

function countDown(){
  let plantCardAmount = document.getElementsByClassName('watering')
  for(let x = plantCardAmount.length; x > 0; x--){
     let numberOfDays = document.getElementById(`${x}`) 
     console.log(numberOfDays)
    }
}



// creates plant card to keep information from json//
function createPlantCard(plant){
    let card = document.createElement('div')
        card.classList.add('plantCard')

        let h3 = document.createElement('h3')
        h3.textContent = `Plant name: ${plant.name} `

        let img = document.createElement('img')
        img.src = plant.img
        if(`${plant.img}` === "") { img.src = "https://i.pinimg.com/originals/3e/93/03/3e9303d2646cb2d84fbb763f7eedb409.jpg"}
        img.classList.add('plant-photo')

        let p = document.createElement('p')
        p.textContent = `Information: ${plant.info}`

        let p2 = document.createElement('p')
        p2.textContent = plant.date

        let btn = document.createElement('button')
        btn.classList.add('watering')
        btn.id = plant.id
        btn.value = plant.days
        btn.textContent =  plant.days
        btn.addEventListener('click', () => {
          p2.textContent = currentDate
          patchPlants(btn.id)
        })
        
    card.append(h3,img,p,p2,btn)
    document.getElementById('plantList').appendChild(card)
}





// creates new plant card with user input information 
// figure out how to default back to blank after submit without deleting my new cards
const form = document.querySelector("form.plant-form")
form.addEventListener("submit", (event) =>{
  event.preventDefault()
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
  
      body: JSON.stringify({...Plants})
    })
    .then(res => res.json())
    .then(plants => createPlantCard(plants))
}

//Patching into json so that my changes to my plant card are forever!!!

function patchPlants(id){
  fetch(`http://localhost:3000/Plants/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type":"application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      date: currentDate
    })
    
  })
  .then(res => res.json())
  .then((json) => console.log(json))
}


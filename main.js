// fetch 
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/Plants') 
    .then(res => res.json())
    .then(plantInfo => plantInfo.forEach(plant => createPlantCard(plant)))
    
})



// the current time
  function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    let time =  document.getElementById('time')
    time.innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
  }

  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }


// getting the current date
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${month}-${day}-${year}`;
  console.log(currentDate)


            
// create new plant card
const addPlantButton = document.querySelector('#addPlant')
    addPlantButton.addEventListener('click', () => {
    createPlantCard()
})


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
            p.textContent = `Information: ${plant.info}`

        let p2 = document.createElement('p')
            p2.textContent = plant.date

        let p3 = document.createElement('p')
            p3.textContent = plant.days
            p3.classList = "hidden"

        let btn = document.createElement('button')
            btn.classList.add('watering')
            btn.id = plant.id
            btn.value = plant.days
            btn.textContent = plant.days
            
          btn.addEventListener('click', () => {
            p2.textContent = currentDate
            btn.textContent = p3.textContent
            patchPlants(btn.id,plant.days)
          })

    card.append(h3,img,p,p2,p3,btn)
    document.getElementById('plantList').appendChild(card)
}

let btn1 = document.getElementById("plantList").getElementsByClassName('plantCard')
console.log(btn1)




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
  
      body: JSON.stringify({...Plants })
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
      //patch days updating every 24 hours
    })
    
  })
  .then(res => res.json())
  .then((json) => console.log(json))
}


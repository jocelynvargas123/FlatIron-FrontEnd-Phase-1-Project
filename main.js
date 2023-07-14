console.log('connected')

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/Plants')
    .then(res => res.json())
    .then(plantInfo => plantInfo.forEach(plant => createPlantCard(plant)))
})

function createPlantCard (plant){
    let card = document.createElement('div')
        card.classList.add('plantCard')
        let h3 = document.createElement('h3')
        h3.textContent = `Plant name: ${plant.name} `
        let img = document.createElement('img')
        img.src = plant.img
        img.classList.add('plant-photo')
        let p = document.createElement('p')
        p.textContent = `Information: ${plant.info}`
        let p2 = document.createElement('p')
        p2.textContent = `Date: ${plant.date}`
        let btn = document.createElement('button')
        btn.textContent =  `Water in ${plant.days} days `
        
    card.append(h3,img,p,p2,btn)
    document.getElementById('plantList').appendChild(card)
}

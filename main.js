console.log('connected')

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/plants')
    .then(res => res.json())
    return console.log("yay")
})

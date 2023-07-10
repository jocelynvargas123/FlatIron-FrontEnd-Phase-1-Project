console.log('connected')

document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000')
    .then(res => res.json())
    return "yes"
})

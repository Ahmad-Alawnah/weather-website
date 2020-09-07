console.log('Client side loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('form input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')
weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(search.value)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    messageOne.textContent = 'Loading message'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''

    fetch('/weather/?address='+location).then(( response ) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error

            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = "the timezone is " + data.timezone
                messageThree.textContent = "The temperature is " + data.temperature + " degree celsius"
                messageFour.textContent = "The probability of rain is " + data.rainProbability + "%"
            
            }
            
        })
    })
    
})
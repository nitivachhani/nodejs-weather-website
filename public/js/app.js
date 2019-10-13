console.log('Client side Javascript file is loaded !!')

//fetch api - only client side: not present in node/backend server

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error) 
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
        
//     })
// })

//component - jsut name, Class - .className, id - #IDValue
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    // console.log('Testing!')
    // console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // fetch('http://localhost:3000/weather?address='+location).then((response) => {
    // Heroku ready
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error) 
                messageOne.textContent = data.error
            } else {
                // console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        
        })
    })
}) 
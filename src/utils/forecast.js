// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     setTimeout(() =>{
//         const url = 'https://api.darksky.net/forecast/2929a61c2aed5a22232128a3e17c391e/' + latitude + ',' + longitude + '?units=us'
//         request({url: url, json: true}, (error, response) => {
//             if (error) {
//                 callback("Unable to connect weather services" , undefined)
//             } else if (response.body.error) {
//                 callback("Unable to find the location", undefined)
//             } else {
//                 callback(undefined, response.body.daily.data[0].summary + " It is crurrently "+ response.body.currently.temperature + " degrees out. There is "+ response.body.currently.precipProbability + "% chance of rain.")
//             }
//         })
//     }, 0)
// }

const forecast = (latitude, longitude, callback) => {
    setTimeout(() =>{
        const url = 'https://api.darksky.net/forecast/2929a61c2aed5a22232128a3e17c391e/' + latitude + ',' + longitude + '?units=us'
        request({url, json: true}, (error, {body}) => {
            if (error) {
                callback("Unable to connect weather services" , undefined)
            } else if (body.error) {
                callback("Unable to find the location", undefined)
            } else {
                callback(undefined, body.daily.data[0].summary + " It is crurrently "+ body.currently.temperature + " degrees out. There is "+ body.currently.precipProbability + "% chance of rain.")
            }
        })
    }, 0)
}

module.exports = forecast
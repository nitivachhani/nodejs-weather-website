const path = require('path')
const express = require('express')
// Partial - load HBS - others just installation is enough
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// express -> function. Does not take arguments. Run function on it to configure the server
const app = express()

// // Provided by wrappper function
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

// app.com
// app.com/help
// app.com/about
// app.com/weather

// app.get('', (req, res) => {
//     res.render('index')
// })
// app.get('', (req, res) => {
//     res.send('<h1>WEATHER</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Niti Patel'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Niti Patel'
    })
})

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Niti Patel',
//         age: '32'
//     }
// })

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Niti Patel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

    geocode(req.query.address, (error, {location, latitude, longitude} = {} ) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    res.send({
        products: []
    })
})

// app.get('/help/*', (req, res)=> {
//     res.send('Help article not found')
// })

app.get('/help/*', (req, res)=> {
    res.render('404', {
        errorMessage: 'Help Article not found',
        title: '404 Help',
        name: 'Niti Patel'
    })
})


// // 404 page - * is wildcard
// app.get('*', (req, res)=> {
//     res.send('My 404 Page')
// })

app.get('*', (req, res)=> {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Niti Patel'
    })
})


// Passed once - to starting the server
// access it: localhost:3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

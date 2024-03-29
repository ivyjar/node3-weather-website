const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handle bars enginge and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app from src',
        name: 'Andrew Meade'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Meade in About Page'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'get help on this page',
        title: 'Help',
        name: 'Andrew Mead in help page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'no address was provided'
        })
    }
     
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send( {error})
        }
        
        forecast(longitude, latitude, (error, {forecast, temp, timezone, rainProbability}) => {
            if (error) {
                return res.send( {error} )
            }
                res.send({
                forecast: forecast,
                temperature: temp,
                timezone: timezone,
                rainProbability: rainProbability 
            })

        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('error',{
        errorMsg: 'Help article not found',
        name: 'Andrew Mead in error page'})
})


app.get('*', (req, res) => {
    res.render('error', {
        title: 404,
        errorMsg: 'Page not found',
        name: 'Andrew Mead in error page'})
})



app.listen(port, () => {
    console.log('Server is up on port' + port)
})
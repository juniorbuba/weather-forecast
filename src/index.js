const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const pathToPublic = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')
const errorPagesPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', '../templates/views')
app.use(express.static(pathToPublic))

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Moh"
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Moh"
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: "Am in trouble!",
        name: "Moh",
        title: "Help"
    })
})

app.get('/weather', (req,res) => {
  if(!req.query.address){
      res.send({error: "Please provide a search argument"})
     return console.log("Please provide a search argument")
  }
 geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
     if(error){
         res.send({ error })
         return console.log(error)
     }

        forecast(latitude, longitude, (error, forecastResponse) => {
            if(error){
                res.send({ error })
                return console.log(error)
            }
            res.send({
                    location: req.query.address,
                    isForecastComplete: "success",
                    response: forecastResponse
            })
        console.log({forecast: forecastResponse})
    })
    console.log({latitude, longitude, location})
  }) 
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        res.send({error: "Please provide a search argument"})
        console.log("Please provide a search argument")
    }
    else{
        console.log(req.query)
    res.send({
        products: []
    })
    } 
})

app.get('/help/*', (req, res) => {
    res.render("helperror", {
        name: "Moh",
        title: "Help - Error"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name: 'Moh',
        title: "Error"
    })
})

app.listen(5128, () => {
    console.log("Server running on port 5128")
})
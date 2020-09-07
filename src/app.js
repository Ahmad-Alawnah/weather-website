const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path') //core module (convension: include before npm) 
const express = require('express') //npm 
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000 //if PORT exists it will use it, otherwise use 3000

console.log(path.join(__dirname, '../public')) //.. go up 1 directory, and /name to go down, if no / is provided, it will go up 2 steps

//partials: reuseable templates for parts of a page.

//paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars and views location
app.set('view engine', 'hbs') //to setup handlebars, needs 'views' directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//app.com
//app.com/help
//app.com/about

// setup static directory to serve
app.use(express.static(publicPath)) //customize the server, in this case, it replaces app.get('')

// app.get('', (req, res)=>{ //request, response (what happens when the user starts a specific url), the empty string is what comes after the / (help or about)
//     res.send('<h1>Weather</h1>') //just imagine that this is deleted
// })

// app.get('/help', (req, res)=>{ //if we use help this will open, but if we use help.html, the html file will open
//     res.send({
//         name: 'Khalil',
//         age: 69
//     })
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About page</h1>')
// })

app.get('', (req, res) => { //for handlebars
    res.render('index', { //provide things to be used in the page
        title: 'Weather app',
        name: 'Abdo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abdo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: ' HEEEEEEEEEELP',
        help: 'ejlfkaioewfjkwadikwadikowaopkiawd',
        name: 'Abdo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
        return
    }
    location = undefined
    tempreture = undefined
    geocode(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error
            })
        }

        location = response.location
        forecast(response.longitude, response.latitude, (error, response) => {
            if (error) {
                return res.send({
                    error
                })
            }

            tempreture = response
            return res.send({
                forecast: tempreture,
                location: location,
                address: req.query.address
            })


        })


    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search string'
        })
        //instead of else
    }
    //req.query // contents of query strings as an object
    res.send({ //we can't respond twice (will cause an exception)
        product: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        error: 'help article not found',
        title: 'ERROR 404',
        name: 'Abdo'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        error: 'Page not found',
        title: 'ERROR 404',
        name: 'Abdo'
    })
})


app.listen(port, () => {
    console.log('server is up and running')
})
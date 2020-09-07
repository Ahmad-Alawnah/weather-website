const request = require('request')
const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWhtYWRhbGF3bmFoIiwiYSI6ImNrZWpuZ2QyMTA0bGwyeW53b3oxcWVoN2cifQ.8p32EDKLXiIqLo0FfT4TXA&limit=1'

    request({url, json: true}, (error, {body} = {} ) =>{
        if (error){
            callback('Unable to connect to location services', undefined) //we can leave undefined, by default it will be undefined 
        }
        else if (body.features.length === 0){
            callback('Unable to find location, please try with another search', undefined)
        }
        else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
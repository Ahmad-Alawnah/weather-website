const request = require('request')
const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=6efe4eaf3e7431b559aa2700e466cb36&query=' + latitude + ',' + longitude
    request({ url, json: true }, (error, {body} = {})=>{
        if (error){
            callback("Unable to connect to weather service", undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ', ' + "it is currently " + body.current.temperature + " degrees, but it feels like " + body.current.feelslike + " degrees")
        }
    })
}

module.exports = forecast
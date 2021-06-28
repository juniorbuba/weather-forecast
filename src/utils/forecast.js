const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=670696949017b6a2a9ff5357c7a2fce5&query='+latitude+','+longitude;

    request({ url, json : true}, (error, { body }) => {
            if(error){
                callback("Unable to connect to the ");
            }
            else if(body.error){
                callback("unable to find location");
            }
            else{
                callback(undefined, {
                    observation_time: body.current.observation_time,
                    current_temperature: body.current.temperature,
                    weather_desc: body.current.weather_descriptions[0],
                    windSpeed: body.current.wind_speed
                })
            }
    })
}

module.exports = forecast
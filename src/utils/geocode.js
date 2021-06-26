const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoid2ViLXdhbGtlcngiLCJhIjoiY2txNWs2NGYzMTgydjJvbG44a3l1b2pieSJ9.WoXooi-tONQTDOxkzX-fSA'

    request({ url, json : true}, (error, { body }) => {
            if(error){
                callback("Unable to connect to Mapbox Location API", undefined)
            }
            else if(body.features.length === 0){
                callback("Couldn't get data, restructure your query", undefined)
            }
            else{
                callback(undefined, {
                    latitude: body.features[0].center[0],
                    longitude: body.features[0].center[1],
                    location: body.features[0].place_name
                })
            }       
    })
}

module.exports= geocode
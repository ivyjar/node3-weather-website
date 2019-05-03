const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0d6d30beaca20cc8bee8758cd9b7e865/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback ('Unable to connect to weather app', undefined)
        } else if (body.error) {
            callback (body.error, undefined)
        } else {
            callback (undefined, {
                timezone:  body.timezone,
                forecast: body.daily.data[0].summary,
                temp: body.currently.temperature,
                rainProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast
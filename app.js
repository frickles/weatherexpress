const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=s%C3%B6derhamn&units=metric&appid=7b1a4f52409074450a76901b1adcaef0';

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const city = weatherData.main.city;
      const temp = weatherData.main.temp;
      const feelsLike = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.write(
        `<h1>Current temperatrue in ${city} temp is ${temp} degrees Celcius</h1>`
      );
      res.write(
        `<p>and ${weatherDescription}, but feels like ${feelsLike} degrees.</p>`
      );
      res.write('<img src=' + imgURL + '>');
      res.send();
    });
  });
});

// npx nodemon app.js
app.listen(3000, function () {
  console.log('Listening on port 3000');
});

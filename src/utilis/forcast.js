const request = require("request");

const forecast = (lit, lon, callback) => {
  const card = lit + "," + lon;
  const posUrl =
    "https://api.weatherapi.com/v1/forecast.json?key=246433f5a92e46788fe121744222712&q=" +
    card +
    "&days=1&aqi=no&alerts=yes";
  request({ url: posUrl, json: true }, (error, response) => {
    if (error) {
      callback("that is a code error", undefined);
    } else if (response.body.error) {
      callback("that is a api error", undefined);
    } else {
      callback(
        undefined,
        response.body.forecast.forecastday[0].day.condition.text
      );
    }
  });
};

module.exports = forecast;

const request = require("request");

const geoCode = (adress, callback) => {
  const posUrl =
    "https://api.weatherapi.com/v1/search.json?key=246433f5a92e46788fe121744222712&q=" +
    adress;
  request({ url: posUrl, json: true }, (error, response) => {
    if (error) {
      callback("that is code error" + error, undefined);
    } else if (response.body.length === 0) {
      callback("that is api error", undefined);
    } else {
      callback(undefined, [response.body[0].lat, response.body[0].lon]);
    }
  });
};

module.exports = geoCode;

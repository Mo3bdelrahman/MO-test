const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geoCode = require("./utilis/geocode");
const forecast = require("./utilis/forcast");
const app = express();

//define paths for express get that files to config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../public/templets/views");
const partialsDirPath = path.join(__dirname, "../public/templets/partials");

// setup hbs and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Mohamed",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "that is a back end message ",
    title: "Help Page",
    name: "Mohamed",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Mohamed",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.adress) {
    return res.send({ error: "you must provide us an Adress" });
  }
  geoCode(req.query.adress, (poser, [lat, lon] = []) => {
    if (poser) {
      return res.send({ error: "that geo api error" });
    }
    forecast(lat, lon, (foreer, foreres) => {
      if (foreer) {
        return res.send({ error: "that forecast api error" });
      }
      res.send({
        location: req.query.adress,
        forecast: foreres,
        latitude: lat,
        longtude: lon,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errormsg: "help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errormsg: "Page not found",
  });
});
app.listen(3000, () => {
  console.log("server is up in port 3000");
});

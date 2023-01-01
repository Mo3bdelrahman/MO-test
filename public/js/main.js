console.log("hllo from client side");

const weatherform = document.querySelector("form");
const searchbox = document.querySelector("input");
const message1 = document.getElementById("mes1");
const message2 = document.getElementById("mes2");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();

  message1.textContent = "Loading ...";
  message2.textContent = "";

  if (searchbox.value === "") {
    message1.textContent = "Please Enter Adress First";
    message2.textContent = "";
  } else {
    const url = "http://localhost:3000/weather?adress=" + searchbox.value;

    fetch(url).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
          message2.textContent = "";
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      });
    });
  }
});

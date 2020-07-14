window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");

    let TemperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    const temperatureSpan = document.querySelector('temperature-section span');
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;

        const proxy = 'https://cors-anywhere.herokuapp.com//';
        const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c2394745b836767721ad1/${lat},${long}`;
      fetch(api)
      .then(response => {
          return response.json();
      })
      .then(data => {
          const {temperature, summary, icon} = data.currently;
          //Set DOM element from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          //Set Icon
          setIcons(icon,document.querySelector(".icon"));
          //Change temperature to celsius/fahrenheit
          temperatureSection.addEventListener("click",() => {
              if(temperatureSpan.textContent === "F"){
                  temperature.textContent = "C";
              }else{
                  temperatureSpan.textContent = "F";
              }

          });


      });
    });
}
function setIcons (icon, iconId) {
    const skycons = new skycons({color:"white"});
    const currentIcon = icon.replace(/-/g,"_").toUpperCase();
    skycons.play();
    return skycons.set(iconId, Skycons[currentIcon]);
}
});

 

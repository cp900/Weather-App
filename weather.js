
function getWeather() {

  const apiKey = '0bc8a9c0fa276cadaaf7215203acab2d';
  const city = document.getElementById('search-box').value; 

  if(!city) {
    alert('please enter the city'); 
    return;
  }
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  
  fetch(apiUrl)
   .then(response => response.json())
   .then((data) => {
    displayWeather(data);
   })
   .catch(error => console.error('There has been an error in fetching data', error))

  fetch(apiForecastUrl)
   .then(response => response.json())
   .then(data => displayForecastData(data))
   .catch(error => console.error('Forecast data cannot be displayed', error))

}



function displayWeather(data) {
  
  
  const tempInfo = document.getElementById('temperature');
  const weatherInfo = document.getElementById('weather-now');
  const cityInfo = document.getElementById('cities');
  const iconInfo = document.getElementById('weather-icon');

  tempInfo.innerHTML = '';
  weatherInfo.innerHTML = ''; 
  cityInfo.innerHTML = '';
  iconInfo.innerHTML = '';
  


  if(data.cod === '404') {
    weatherInfo .innerHTML = `<p>${data.message}</p>`

  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const weather = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconDisplay = `https://openweathermap.org/img/wn/${icon}@2x.png`


    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${weather}</p>`;
    const cityHTML = `<h2>${cityName}</h2>`;
    

    tempInfo.innerHTML = temperatureHTML;
    weatherInfo.innerHTML = weatherHTML; 
    cityInfo.innerHTML = cityHTML;
    iconInfo.src = iconDisplay;

  }
}


function displayForecastData(data) {
  const displayTimesElements = [
    'time-one', 'time-two', 'time-three', 'time-four', 'time-five'
  ];

  const displayIconElements = [
    'icon-one', 'icon-two', 'icon-three', 'icon-four', 'icon-five'
  ];

  const displayTempElements = [
    'temp-one', 'temp-two', 'temp-three', 'temp-four', 'temp-five'
  ];
  

  displayTimesElements.forEach(id => document.getElementById(id).innerHTML = '');
  displayIconElements.forEach(id => document.getElementById(id).innerHTML = '');
  displayTempElements.forEach(id => document.getElementById(id).innerHTML = '');

  data.list.slice(0,5).forEach((item, index) => {

    const tempForecast = Math.round(item.main.temp - 273.15);
    const time = item.dt_txt.slice(11, 16);
    const icons = item.weather[0].icon;
    const iconsURL= `https://openweathermap.org/img/wn/${icons}.png`;
    
    


    const timeHTML = `<p>${time}</p>`
    const tempHTML = `<p>${tempForecast}°C</p>`
    
    

    document.getElementById(displayTimesElements[index]).innerHTML = timeHTML;
    document.getElementById(displayIconElements[index]).src = `${iconsURL}`;
    document.getElementById(displayTempElements[index]).innerHTML = tempHTML;

   
  })
}
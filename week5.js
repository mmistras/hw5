// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)
  
  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {
    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location
    let locationInput = document.querySelector(`#location`)
    let numDaysInput = document.querySelector(`#days`)
    
    // - Get the user-entered location and number of days from the elements' values
    let location = locationInput.value
    let numDays = numDaysInput.value

    // - Check to see if the user entered anything; if so:
    if (location.length > 0 && numDays > 0 && numDays < 11) {
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=8df9bd346ee745859af155053212704&q=${location}&days=${numDays}`
      
      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // For current weather (lab)
      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
      let locationNew = `${json.location.name}, ${json.location.region}`
      let currentTemp = json.current.temp_f
      let currentCondition = json.current.condition.text
      let currentIcon = json.current.condition.icon

      // Get a reference for the location title
      let locationTitle = document.querySelector(`.current`)

      // Replace inner HTML using javascript
      locationTitle.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${locationNew}</div>
          <div class="font-bold">
            <img src="https:${currentIcon}" class="inline-block">
            <span class="temperature">${currentTemp}</span>° 
            and
            <span class="conditions">${currentCondition}</span>
          </div>
        </div>
      `

      // For forecast (homework)
      //Header
      // Get a reference for the forecast div
      let forecastTitle = document.querySelector(`.forecast`)

      forecastTitle.insertAdjacentHTML(`beforeend`,`
      <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${numDays} Day Forecast</div>
      <div>
      `)

      // Create for loop to count forecast days
      for (let i=0; i<json.forecast.forecastday.length; i++) {
        // Create variables to store forecast data in memory
        let date = json.forecast.forecastday[i].date
        let forecastDay = json.forecast.forecastday[i].day

        let forecastIcon = forecastDay.condition.icon
        let forecastCondition = forecastDay.condition.text
        let forecastMin = forecastDay.mintemp_f
        let forecastMax = forecastDay.maxtemp_f

        forecastTitle.insertAdjacentHTML(`beforeend`,`
          <div class="text-center space-y-8">
            <div>
              <img src="https:${forecastIcon}" class="mx-auto">
              <h1 class="text-2xl text-bold text-gray-500">2021-04-27</h1>
              <h2 class="text-xl">High ${forecastMax}° – Low ${forecastMin}°</h2>
              <p class="text-gray-500">${forecastCondition}</h1>
            </div>
          </div>
        `)
      }
    }
  })
})
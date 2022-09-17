var searchForm = document.querySelector("#search-form"); 
var searchInput = document.getElementById("search-input"); 
var currentWeatherEl = document.getElementById("#current-weather"); 
var currentCity = document.querySelector(".city-name"); 
var forecastEl = document.getElementById("#forecast"); 
//push names into empty array, JSON.parse converts from an external API to a javascript object
//the || (or) operand returns a boolen (true/false) value  
let localStorageBtns = JSON.parse(localStorage.getItem("cities"))||[];


//this fetches city name from user input
function searchHistory (cityName) {
    fetch ("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=0bd6c9eb0ccae4cb3b7ffb240f04992c")
    .then(function(res){
        return res.json()
    })
    .then(function(data){
        var lat = data[0].lat; 
        var lon = data[0].lon; 
        weatherData(lat, lon); 
    })
}
renderBtns(); 

//this gives us the data
function weatherData(lat, lon) {
    fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon+"&exclude=hourly,minutely&appid=0bd6c9eb0ccae4cb3b7ffb240f04992c")
    .then(function(res){
        return res.json()
        //this shows the status code of the call (i.e. 404-error)
    })
    .then(function(data){
        console.log(data); 
        renderBtns(); 
        // currentWeather(); 
    })
}

function currentWeather () {
    //need to get data and populate p tags and title tag 
    // currentCity.textContent = cityButton; 
    //need to get UV color button 
}

function futureForecast () {
    //need to get icons and dates
    let forecast = document.getElementById('#forecast'); 
    forecast.innerHTML= resp.daily.map(day => {
        if(idx <= 4) {
            return `<div class="card">
            <div class="card-body">
              <h5 class="card-title">08/30/22</h5>
              <p class="forcast-temp">Temp:</p>
              <p class="forcast-wind">Wind:</p>
              <p class="forcast-humidity">Humidity:</p>
            </div>
        </div>`;
        }
        
    }
        ).join(''); 
}


function renderBtns() {
    document.querySelector("ul").innerHTML=" "; 
    for (var i=0; i < localStorageBtns.length; i++) {
 //render search data as buttons
 var ulEl = document.querySelector("ul");
 var listEl = document.createElement("li");
 //creates button elements
 var buttonData = document.createElement("button");
 //adding the buttons to the list of classes under the name "search-buttons"
 buttonData.classList.add("search-buttons");
 //text content for buttons
 buttonData.textContent = localStorageBtns[i]; 
 //adds button to list
 listEl.append(buttonData);
 //adds another list element to the unordered list
 ulEl.append(listEl);

 
 $(buttonData).on("click", function(event) {
     console.log($(event.target).html());
     const cityButton = $(event.target).html(); 
     searchHistory(cityButton);
 })
}}
//i also need this click to display the current weather info 


$(".searchBtn").click(function(event) {
    event.preventDefault(); 
    var userInfo = $("#search-input").val();
    // console.log($("#search-input").val());
    searchHistory(userInfo) //grabs lat and lon 
    localStorageBtns.push(userInfo)
    localStorage.setItem("cities", JSON.stringify(localStorageBtns))
})
//this keeps the info on the page after it reloads (jquery)
$( document ).ready(function() {
});





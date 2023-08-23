const inputSearch = document.getElementById("input-search")
const btnSearch = document.getElementById("btn-search")
const weatherCont = document.querySelector(".weather")
const forecastEL=document.querySelector(".forecast")
const historyEl=document.querySelector(".history-container")
const apiKey = "7c2d974f16a011166269a9e79bbe3102"
let cityArray=[]


//

function getWeather(city) {
    const todayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`

    //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=cfe4cc62e2f46e96032d169aef4f02e5
    fetch(todayUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            displayToday(data)
        })

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}&units=metric`
    fetch(forecastUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            displayForecast(data.list)
        })
}
function displayToday(todayData) {
        weatherCont.innerHTML=""
    const card =document.createElement("div")
    card.setAttribute("class", "card")
    const cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const cardBody=document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    const span= document.createElement("span")
    const icon=document.createElement("img")
    icon.setAttribute("src", "https://openweathermap.org/img/w/"+todayData.weather[0].icon +".png")
    const h2= document.createElement("h2")
    h2.setAttribute("class", "city-name")
    const todayTemp= document.createElement("p")
    const todayHumid=document.createElement("p")
    const todayWind=document.createElement("p")

    h2.textContent= todayData.name

    // today's forcast
    //set values for needed weather criteria to a variable 
     todayTemp.textContent = `Temperature:${Math.round(todayData.main.temp)}°C`
     todayWind.textContent = `Wind Speed:${todayData.wind.speed} kph`
     todayHumid.textContent = `Humidity:${todayData.main.humidity}%`

     span.append(icon)
     h2.append(span)
     cardHeader.append(h2)
     cardBody.append(todayTemp, todayHumid, todayWind)
     card.append(cardHeader,cardBody)
     weatherCont.append(card)

    

}

function displayForecast(forecastData) {
    forecastEL.innerHTML=""
  
    for(let i=0; i<7; i++){

    const card =document.createElement("div")
    card.setAttribute("class", "card forecast-card")
    const cardHeader=document.createElement("div")
    cardHeader.setAttribute("class", "card-header")
    const cardBody=document.createElement("div")
    cardBody.setAttribute("class", "card-body")
    const span= document.createElement("span")
    const icon=document.createElement("img")
    icon.setAttribute("src", "https://openweathermap.org/img/w/"+forecastData[i].weather[0].icon +".png")
    const h2= document.createElement("h4")
    h2.setAttribute("class", "city-name")
    const temp= document.createElement("p")
    const humid=document.createElement("p")
    const wind=document.createElement("p")
    const forDate= i * 8 + 4
    const day= new Date(forecastData[forDate].dt*1000).toDateString()
    h2.textContent=day
    temp.textContent=`Temp:${Math.round(forecastData[i].main.temp)}°C`
    humid.textContent=`Humidity: ${forecastData[i].main.humidity} %`
    wind.textContent=`Wind Speed: ${forecastData[i].wind.speed} kph`
    
    span.append(icon)
    h2.append(span)
    cardHeader.append(h2)
     cardBody.append(temp, humid, wind)
     card.append(cardHeader,cardBody)
     forecastEL.append(card)



    }
}

function createUIforPreviousCity(searchHistory){
    const btn=document.createElement("button")
  btn.setAttribute("class", "btn btn-warning")
  btn.textContent=searchHistory
  historyEl.append(btn)

}

let searchHistory=JSON.parse(localStorage.getItem("history")) || []
for(let i=0; i<searchHistory.length;i++){
    createUIforPreviousCity(searchHistory[i])
}

function pushSearchHistory(city) {
    cityArray=JSON.parse(localStorage.getItem("history"))||[]
    if(!cityArray.includes(city)){
        cityArray.push(city)
        localStorage.setItem("history", JSON.stringify(cityArray))
        createUIforPreviousCity(city)
    }
 
}


btnSearch.addEventListener("click", (e) => {
    e.preventDefault()
    const city = inputSearch.value
    getWeather(city)
    if (city){
        pushSearchHistory(city)
    }
    
})

historyEl.addEventListener("click", (e)=>{
    e.preventDefault()
    weatherCont.innerHTML=""
    forecastEL.innerHTML=""
    const cityClick=this.event.target.textContent
    getWeather(cityClick)
})
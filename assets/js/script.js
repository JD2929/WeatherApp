const inputSearch=document.getElementById("input-search")
const btnSearch=document.getElementById("btn-search")
const weatherCont=document.querySelector(".weather")
const apiKey="7c2d974f16a011166269a9e79bbe3102"
//

function getWeather(city){
    const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    fetch(url)
    .then(response=>response.json())
    .then((data)=>{
        console.log(data);
        displayWeather(data)
    })
}

function displayWeather(data){
    

}

btnSearch.addEventListener("click", (e)=>{
    e.preventDefault()
    const city= inputSearch.value
    getWeather(city)
})
let srch = document.getElementById("location")
let Name = document.getElementById("name")
let tempFirst = document.getElementById("tempFirst")
let weatherFirst = document.getElementById("firstWeather")
let weather2 = document.getElementById("weather2")
let weather3 = document.getElementById("weather3")
let day1 = document.getElementById("day1")
let day2 = document.getElementById("day2")
let day3 = document.getElementById("day3")
let month1 = document.getElementById("month1")
let icon1 = document.getElementById("first_icon")
let icon2 = document.getElementById("icon2")
let icon3 = document.getElementById("icon3")
let rain = document.getElementById("rain")
let wind = document.getElementById("wind")
let directionn = document.getElementById("direction")
let tempHighest2 = document.getElementById("temp2")
let tempLowest2 = document.getElementById("temp2_2")
let tempHighest3 = document.getElementById("temp3")
let tempLowest3 = document.getElementById("temp3_2")
srch.addEventListener("input",function(){
    search()
})
async function search(){
    let word = srch.value
    let result = await getCity(word)
    console.log(result);
    updatingUI(result)

}
async function getCity( word) {
    try{
        let res = await fetch("https://api.weatherapi.com/v1/forecast.json?key=b5a5d89506ee443fb5123448252007&q="+word + "&days=3")
        res = await res.json()
        if(!res || !res.location){
            throw new Error("Invalid data input")
        }
        return res
    }
    catch(error){
        console.log("Error: "+error)
    }

    
}
function updatingUI(result){
    Name.innerText = result.location.name
    tempFirst.innerText = result.current.temp_c + "°C"
    weatherFirst.innerText = result.current.condition.text
    let day = new Date(result.current.last_updated)
    let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    day1.innerText = dayName[day.getDay()]
    dayNum = day.getDate()
    let monthNames = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"]
    let month = monthNames[day.getMonth()]
    month1.innerText = dayNum+month
    icon1.innerHTML = `<img src="${result.current.condition.icon}" alt="">`
    rain.innerText = result.current.humidity + "%"
    wind.innerText = result.current.wind_kph+ "km/h"
    directionn.innerText = result.current.wind_dir
    day = new Date(result.forecast.forecastday[1].date)
    day2.innerText = dayName[day.getDay()]
    day = new Date(result.forecast.forecastday[2].date)
    day3.innerText = dayName[day.getDay()]
    icon2.innerHTML = `<img src="${result.forecast.forecastday[1].day.condition.icon}" alt="">`
    tempHighest2.innerText = result.forecast.forecastday[1].day.maxtemp_c + "°C"
    tempLowest2.innerText = result.forecast.forecastday[1].day.mintemp_c + "°C"
    weather2.innerText = result.forecast.forecastday[1].day.condition.text
    icon3.innerHTML = `<img src="${result.forecast.forecastday[2].day.condition.icon}" alt="">`
    tempHighest3.innerText = result.forecast.forecastday[2].day.maxtemp_c + "°C"
    tempLowest3.innerText = result.forecast.forecastday[2].day.mintemp_c + "°C"
    weather3.innerText = result.forecast.forecastday[2].day.condition.text
}
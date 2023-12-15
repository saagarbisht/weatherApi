const userInput = document.querySelector("#user-input");
const displayResult = document.querySelector("#display-result");
const form = document.querySelector("#form");
const key= "a1e339c8bf3a94e3bb2e20a765ce4b3c";

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const loc = userInput.value.trim().toLowerCase();
    if(loc){
        processWeatherData(loc);
    }else{
        alert("please enter a location");
    }
})

async function getWeatherData(location){
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`);
        return await response.json();
    } catch (error) {
        alert("can't get your data! please reload the page");
    }
}

function tempConvert(temp){
    return `${(temp - 273.15).toFixed(1)}\u00B0C`;
}

const getDawnAndDusk  = (time) => {
    const date = new Date(time * 1000)
    return date.toLocaleString('en-US', { hour: 'numeric' , minute : '2-digit', hour12: true });
}

const displayWeatherData = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        displayResult.children[i].firstElementChild.firstElementChild.innerHTML = arr[i];
    }
    displayResult.style.display = "flex"
}

const processWeatherData = async(loc)=>{
    const locationData = await getWeatherData(loc);
    const weather = locationData["weather"][0]["description"];
    const temp = tempConvert(locationData["main"]["feels_like"]);
    const sunrise = getDawnAndDusk(locationData["sys"]["sunrise"]);
    const sunset  = getDawnAndDusk(locationData["sys"]["sunset"]);
    displayWeatherData([weather,temp,sunrise,sunset]);
}


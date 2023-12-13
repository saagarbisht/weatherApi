const searchOption = document.querySelector("#search-option");
const userInput = document.querySelector("#user-input");
const btn = document.querySelector("#submit-btn");

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const loc = userInput.value.trim().toLowerCase();
    const type = searchOption.value;
    if(loc){
        getLatAndLon(loc,type);
    }else{
        alert("please enter a location");
    }
})

const key1 = "1fd9401630e240aab6b9edef5da09735";
const key2= "a1e339c8bf3a94e3bb2e20a765ce4b3c";

function tempConvert(temp){
    return (temp - 273.15).toFixed(1);
};

async function getLatAndLon(place,type){
    try {
        const responce = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${place}&lang=en&type=${type}&format=json&apiKey=${key1}`);
        const data = await responce.json();
        const lat = data["results"][0]["lat"]; 
        const lon = data["results"][0]["lon"];
        getWeatherData(lat,lon);
    } catch (error) {
        alert("please enter a valid location")
    }
};

async function getWeatherData(lat,lon){
    try {
        const responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key2}`);
        const data = await responce.json();
        displayingResult(data);
    } catch (error) {
        console.log(error);
        alert("sorry for the inconvenience, we are unable to fetch your data");
    }
};


function displayingResult(data){
    const temp = tempConvert(data.main.feels_like); 
    const minTemp = tempConvert(data.main.temp_min); 
    const maxTemp = tempConvert(data.main.temp_max);
    
    const result = document.querySelector("#display-result");
    Array.from(result.children).forEach((ele)=>{
        if(ele.lastElementChild.id === "temp-value"){
            ele.lastElementChild.textContent = `${temp}°C`;
        }
        if(ele.lastElementChild.id === "min-temp-value"){
            ele.lastElementChild.textContent = `${minTemp}°C`;
        }
        if(ele.lastElementChild.id === "max-temp-value"){
            ele.lastElementChild.textContent = `${maxTemp}°C`;
        }
    })
    
    result.style.display = "flex"
    
}
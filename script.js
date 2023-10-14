

let cityName = document.querySelector("#name");
let countryName = document.querySelector("#countryName");
let tempC = document.querySelector("#tempC");
let weatherCondition = document.querySelector("#weatherCondition");
let weatherConditionIcon = document.querySelector("#weatherConditionIcon");
let feelsLikeC = document.querySelector("#feelsLikeC");

let windSpeed = document.querySelector("#windSpeed");
let windDir = document.querySelector("#windDir");
let humidityP = document.querySelector("#humidityP");
let pressure = document.querySelector("#pressure");
let visibility = document.querySelector("#visibility");
let currentTime = document.querySelector("#current-time");
let timezone = document.querySelector("#timezone");
let latitude = document.querySelector("#latitude");
let longitude = document.querySelector("#longitude");

let moonrise = document.querySelector("#moonrise");
let moonset = document.querySelector("#moonset");
let moonphase = document.querySelector("#moonphase");
let moonillu = document.querySelector("#moonillu");

let sunrise = document.querySelector("#sunrise");
let sunset = document.querySelector("#sunset");

let pm25 = document.querySelector("#pm25");
let pm10 = document.querySelector("#pm10");
let so2 = document.querySelector("#so2");
let co = document.querySelector("#co");
let o3 = document.querySelector("#o3");
let no2 = document.querySelector("#no2");
let airCityName = document.querySelector("#airCityName");

let searchKey = document.querySelector("#search-key");
let searchBtn = document.querySelector("#search-btn");

let resultHideBlock = document.querySelector(".resultHideBlock");


const searchData = async(searchkeyData)=>{
    const url = 'https://weatherapi-com.p.rapidapi.com/search.json?q='+searchkeyData;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f79153bb1cmsh76e05f3cde18731p1e77fdjsn4c7a883348d4',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

       
        let smallEl = "";
        resultHideBlock.classList.add("result");
        result.forEach((data)=>{
            let city = data.name+", ";
            let state = data.region+", ";
            let country = data.country;
            console.log(city,state,country);
            smallEl.innerHTML = "";
            resultHideBlock.innerHTML = "";
            smallEl = document.createElement("small");
            smallEl.innerHTML = `${city}${state}${country}`;
            smallEl.style.cursor = "pointer";
                
        });
        
        resultHideBlock.appendChild(smallEl);

    } catch (error) {
        console.error(error);
        resultHideBlock.classList.remove("result");
        resultHideBlock.innerHTML = "";
    }
}



const fetchApi = async (area)=>{
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q='+area;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f79153bb1cmsh76e05f3cde18731p1e77fdjsn4c7a883348d4',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        console.log(result);
    
        cityName.innerHTML = result.location.name;
        countryName.innerHTML = result.location.country;

        airCityName.innerHTML = result.location.name;

        tempC.innerHTML = result.current.temp_c;
        weatherCondition.innerHTML = result.current.condition.text;
        weatherConditionIcon.src = result.current.condition.icon;
        feelsLikeC.innerHTML = result.current.feelslike_c;
        windSpeed.innerHTML = result.current.wind_kph;
        windDir.innerHTML = result.current.wind_dir;
        humidityP.innerHTML = result.current.humidity;
        pressure.innerHTML = result.current.pressure_mb;
        visibility.innerHTML = result.current.vis_km;

        
        currentTime.innerHTML = result.location.localtime;

        timezone.innerHTML = result.location.tz_id;
        latitude.innerHTML = result.location.lat;
        longitude.innerHTML = result.location.lon;
        
    } catch (error) {
        console.error(error);
    }
}

fetchApi("New Delhi, Delhi, India");

const astroFetch = async (astroCity)=>{
    const url = 'https://weatherapi-com.p.rapidapi.com/astronomy.json?q='+astroCity;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f79153bb1cmsh76e05f3cde18731p1e77fdjsn4c7a883348d4',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        moonrise.innerHTML = result.astronomy.astro.moonrise;
        moonset.innerHTML = result.astronomy.astro.moonset;
        moonphase.innerHTML = result.astronomy.astro.moon_phase;
        moonillu.innerHTML = result.astronomy.astro.moon_illumination;

        sunrise.innerHTML = result.astronomy.astro.sunrise;
        sunset.innerHTML = result.astronomy.astro.sunset;

    } catch (error) {
        console.error(error);
    }
}

astroFetch("New Delhi, Delhi, India");


const airqualityFetch = async (city,state,country)=>{
    const url = `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${city}&state=${state}&country=${country}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f79153bb1cmsh76e05f3cde18731p1e77fdjsn4c7a883348d4',
            'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        pm25.innerHTML = result.overall_aqi;
        pm10.innerHTML = result.PM10.aqi;
        so2.innerHTML = result.SO2.aqi;
        co.innerHTML = result.CO.aqi;
        o3.innerHTML = result.O3.aqi;
        no2.innerHTML = result.NO2.aqi;        

    } catch (error) {
        console.error(error);
    }
}

airqualityFetch("New Delhi","Delhi","India");


searchKey.addEventListener('input',()=>{
    if(searchKey.value == "")
    {
        resultHideBlock.innerHTML = "";
        resultHideBlock.classList.remove("result");
        
    }
    else{
        searchData(searchKey.value);
    }
        
    
});

resultHideBlock.addEventListener('click',()=>{
    let textLocation = resultHideBlock.firstChild.innerHTML;
    let reallocation = searchKey.value = textLocation;
    fetchApi(reallocation);
    let splitLocation = reallocation.split(",");
    airqualityFetch(splitLocation[0],splitLocation[1],splitLocation[2]);
    astroFetch(reallocation);

    resultHideBlock.innerHTML = "";
    resultHideBlock.classList.remove("result");
    
});
















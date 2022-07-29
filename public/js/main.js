let latitude;
let longitude;
document.getElementById('getData').addEventListener('click', navigateToDataPage);

function initMap() {
    let address = (document.getElementById('autocomplete'));
    let autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
        let place = autocomplete.getPlace();
        latitude = place.geometry.location.lat().toFixed(1);
        longitude = place.geometry.location.lng().toFixed(1);
    })   
}

function navigateToDataPage() {
    window.location.href=`${window.location.origin}/data?lat=${latitude}&lon=${longitude}&loc=${autocomplete.value}`;
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let lat = Object.values(params)[0]
let lng = Object.values(params)[1]
let address = (Object.values(params)[2])


async function fetchAQI(){
    getWeather();
    const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=3ae275f437e5587b7eabbc738d8f07aab52665a8`);
    const aqiData = await response.json();

    let aqi = aqiData.data.aqi;
    document.querySelector('.aqiStation').style.display = 'block'
    document.querySelector('.dataContainer').style.display = 'flex'
    document.getElementById('actualAddress').innerText = address;
    document.getElementById('closestStation').innerText = aqiData.data.city.name;
    document.getElementById('aqiValue').innerText = aqi;
    console.log(aqiData.data)
    if(aqi < 51){
        document.getElementById('pollutionLevel').innerText = "good."
        document.getElementById('aqiNumber').style.background = 'rgba(136, 238, 199)'
        document.getElementById('aqiInfoContainer').style.background = 'rgba(71, 184, 140)'
    }else if(aqi > 50 && aqi < 101){
        document.getElementById('pollutionLevel').innerText = "moderate."
        document.getElementById('aqiNumber').style.background = 'rgba(245, 245, 179)'
        document.getElementById('aqiInfoContainer').style.background = 'rgba(177, 177, 83)'
    }else if(aqi > 100 && aqi < 151){
        document.getElementById('pollutionLevel').innerText = "unhealthy for moderate groups."
        document.getElementById('aqiNumber').style.background = 'rgba(235, 206, 144)'
        document.getElementById('aqiInfoContainer').style.background = 'rgba(184, 156, 95)'
    }else if(aqi > 150 && aqi < 201){
        document.getElementById('pollutionLevel').innerText = "unhealthy."
        document.getElementById('aqiNumber').style.background = 'rgba(236, 159, 159)'
        document.getElementById('aqiInfoContainer').style.background = 'rgba(228, 92, 92)'
    }else if(aqi > 200 && aqi < 301){
        document.getElementById('pollutionLevel').innerText = "very unhealthy."
        document.getElementById('aqiNumber').style.background = 'rgba(231, 186, 231)'
        document.getElementById('aqiInfoContainer').style.background = 'rgba(177, 112, 177)'
    }else if(aqi > 300){
        document.getElementById('pollutionLevel').innerText = "hazardous."
        document.getElementById('aqiNumber').style.background = 'rgba(224, 71, 112)'
        document.getElementById('aqiInfoContainer').style.background = 'rgba(136, 55, 77)'
    }
}

async function getWeather(){
    const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lng}&appid=7b0f2c120e4676f27d74c46d2b0a2394`);
    const weather = await response2.json();
    console.log(weather.weather[0].main);
    document.getElementById('forecast').innerText = weather.weather[0].main
}


console.log(`The latitude is ${lat} and the longitude is ${lng}`)



// We need to save the lat and lng in local storage? Not sure yet. I eventually need to 
// pass them as query params below

// `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=process.env.TOKEN`


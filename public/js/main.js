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
    createTable();
    const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=3ae275f437e5587b7eabbc738d8f07aab52665a8`);
    const aqiData = await response.json();

    let aqi = aqiData.data.aqi;
    document.querySelector('.aqiStation').style.display = 'block'
    document.getElementById('loading').style.display = 'none'
    document.querySelector('.dataContainer').style.display = 'flex'
    document.getElementById('actualAddress').innerText = address;
    document.getElementById('closestStation').innerText = aqiData.data.city.name;
    document.getElementById('aqiValue').innerText = aqi;
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
    let forecast = weather.weather[0].main
    document.getElementById('temp').innerText = weather.main.temp + '°'
    document.getElementById('forecast').innerText = forecast
    document.getElementById('humidity').innerText = weather.main.humidity + '%'
    document.getElementById('wind').innerText = weather.wind.speed + ' MPH'

    if(forecast == 'Clouds'){
        document.getElementById('weatherIcon').classList += ' fa-solid fa-cloud fa-3x'
    }if(forecast == 'Clear'){
        document.getElementById('weatherIcon').classList += ' fa-solid fa-sun fa-3x'
    }
}

async function createTable(){
    const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=3ae275f437e5587b7eabbc738d8f07aab52665a8`);
    const aqiData = await response.json();
    anychart.onDocumentReady(function() {
        anychart.theme(anychart.themes.darkProvence);
        // set the data
        let data = {
            header: ["Name", "Micrograms per cubic meter"],
          rows: [
            [aqiData.data.forecast.daily.o3[2].day, aqiData.data.forecast.daily.o3[2].avg],
            [aqiData.data.forecast.daily.o3[3].day, aqiData.data.forecast.daily.o3[3].avg],
            [aqiData.data.forecast.daily.o3[4].day, aqiData.data.forecast.daily.o3[4].avg],
            [aqiData.data.forecast.daily.o3[5].day, aqiData.data.forecast.daily.o3[5].avg],
            [aqiData.data.forecast.daily.o3[6].day, aqiData.data.forecast.daily.o3[6].avg]
        ]};
        
        let data2 = {
            header: ["Name", "Micrograms per cubic meter"],
          rows: [
            [aqiData.data.forecast.daily.o3[2].day, aqiData.data.forecast.daily.pm10[2].avg],
            [aqiData.data.forecast.daily.o3[3].day, aqiData.data.forecast.daily.pm10[3].avg],
            [aqiData.data.forecast.daily.o3[4].day, aqiData.data.forecast.daily.pm10[4].avg],
            [aqiData.data.forecast.daily.o3[5].day, aqiData.data.forecast.daily.pm10[5].avg],
            [aqiData.data.forecast.daily.o3[6].day, aqiData.data.forecast.daily.pm10[6].avg]
        ]};
        
        let data3 = {
            header: ["Name", "Micrograms per cubic meter"],
          rows: [
            [aqiData.data.forecast.daily.o3[2].day, aqiData.data.forecast.daily.pm25[2].avg],
            [aqiData.data.forecast.daily.o3[3].day, aqiData.data.forecast.daily.pm25[3].avg],
            [aqiData.data.forecast.daily.o3[4].day, aqiData.data.forecast.daily.pm25[4].avg],
            [aqiData.data.forecast.daily.o3[5].day, aqiData.data.forecast.daily.pm25[5].avg],
            [aqiData.data.forecast.daily.o3[6].day, aqiData.data.forecast.daily.pm25[6].avg]
        ]};
        
        let data4 = {
            header: ["Name", "Micrograms per cubic meter"],
          rows: [
            [aqiData.data.forecast.daily.o3[2].day, aqiData.data.forecast.daily.uvi[1].avg],
            [aqiData.data.forecast.daily.o3[3].day, aqiData.data.forecast.daily.uvi[2].avg],
            [aqiData.data.forecast.daily.o3[4].day, aqiData.data.forecast.daily.uvi[3].avg],
            [aqiData.data.forecast.daily.o3[5].day, aqiData.data.forecast.daily.uvi[4].avg],
            [aqiData.data.forecast.daily.o3[6].day, aqiData.data.forecast.daily.uvi[5].avg]
        ]};
        
        
        // create the chart
        let chart = anychart.column();
        let chart2 = anychart.column();
        let chart3 = anychart.column();
        let chart4 = anychart.column();
        
        // add data
        chart.data(data);
        chart2.data(data2);
        chart3.data(data3);
        chart4.data(data4);
        
        // set the chart title
        chart.title("Ozone Five Day Averages");
        chart2.title("Particulate Matter (PM10) Five Day Averages");
        chart3.title("Particulate Matter (PM2.5) Five Day Averages");
        chart4.title("UVI Five Day Averages");
        // draw
        chart.container("container");
        chart.draw();
        chart2.container("container2");
        chart2.draw();
        chart3.container("container3");
        chart3.draw();
        chart4.container("container4");
        chart4.draw();
        
        });
}




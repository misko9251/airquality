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
    window.location.href=`${window.location.origin}/data?lat=${latitude}&lon=${longitude}`;
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let lat = Object.values(params)[0]
let lng = Object.values(params)[1]


async function fetchAQI(){
    const response = await fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=3ae275f437e5587b7eabbc738d8f07aab52665a8`);
    const aqiData = await response.json();
    let aqi = (aqiData.data.aqi);
    document.getElementById('aqi').innerText = aqi
}

console.log(`The latitude is ${lat} and the longitude is ${lng}`)



// We need to save the lat and lng in local storage? Not sure yet. I eventually need to 
// pass them as query params below

// `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=process.env.TOKEN`


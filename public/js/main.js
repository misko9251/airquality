let latitude;
let longitude;

function initMap() {
    let address = (document.getElementById('autocomplete'));
    let autocomplete = new google.maps.places.Autocomplete(address);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
        let place = autocomplete.getPlace()
        latitude = place.geometry.location.lat().toFixed(1);
        longitude = place.geometry.location.lng().toFixed(1);
    })   
}

// `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=process.env.TOKEN`

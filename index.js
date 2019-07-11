console.log("js attached");

let d = new Date()

const apiKeyYelp = "CjrGwySGXlQ7WM-8KxkcW6UmqNdbLrAWSPuVQ94h_oicfw2sAH7kg1QhcRDqJwwxnlYeJt7mHGQRHIxXhV-Nu9uWlwuioOzwEdY_hGELQexdt7TqTB22UMzDnBscXXYx";
const urlYelp = "https://api.yelp.com/v3/categories/";

const apiKeyMovieGlu = "0mcK8liAA823jNLp5iqfmV5lAu467j84v4OW3I6c";
const urlMovieGlu = "https://api-gate2.movieglu.com/";

 function getCinemasByLocation(zipResponseJson){
    const cinemaHeader = {
        headers: new Headers({
            "client" : "THIN_2",
            "x-api-key" : apiKeyMovieGlu,
            "authorization" : "Basic VEhJTl8yOlF3WlJuM0prNks2Tg==",
            "territory" : "US",
            "api-version" : "v200",
            "device-datetime" : d.toISOString(),
            "geolocation" : `${zipResponseJson.records[0].fields.latitude};${zipResponseJson.records[0].fields.longitude}`
        })
    };
    const cinemaUrl = urlMovieGlu + "cinemasNearby/?n=24";

    fetch(cinemaUrl, cinemaHeader).then(cinemaResponse => {
        if(cinemaResponse.ok){
            return cinemaResponse.json();
        }
        throw new Error(cinemaResponse.statusText);
    }).then(cinemaResponseJson => console.log(cinemaResponseJson))
    .catch(err => {
        $('#js-error-message').text(`Something Failed: ${err.message}`);
    })
 }

function getZipCodeLatLong(searchTerm){
    const zipParams = {
        dataset: "us-zip-code-latitude-and-longitude",
        q: searchTerm,
        format: "json"
    };
    let queryString = $.param(zipParams);
    const zipUrl = "https://public.opendatasoft.com/api/records/1.0/search?" + queryString;
    console.log("url", zipUrl);
    fetch(zipUrl).then(zipResponse => {
        if(zipResponse.ok){
            return zipResponse.json();
        }
        throw new Error(zipResponse.statusText);
    }).then(zipResponseJson => getCinemasByLocation(zipResponseJson))
    .catch(err => {
        $('#js-error-message').text(`Something Failed: ${err.message}`);
    })
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#searchLocation').val();
        console.log("data", searchTerm);
        getZipCodeLatLong(searchTerm);
    })
}

$(watchForm);
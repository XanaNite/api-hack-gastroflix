console.log("js attached");

const apiKeyYelp = "CjrGwySGXlQ7WM-8KxkcW6UmqNdbLrAWSPuVQ94h_oicfw2sAH7kg1QhcRDqJwwxnlYeJt7mHGQRHIxXhV-Nu9uWlwuioOzwEdY_hGELQexdt7TqTB22UMzDnBscXXYx";
const urlYelp = "https://api.yelp.com/v3/categories/";

const apiKeyMovieGlu = "0mcK8liAA823jNLp5iqfmV5lAu467j84v4OW3I6c";
const urlMovieGlu = "	https://api-gate2.movieglu.com/";
const movieHeader = {
    "client" : "THIN_2",
    "x-api-key" : apiKeyMovieGlu,
    "authorization" : "Basic VEhJTl8yOlF3WlJuM0prNks2Tg==",
    "territory" : "US",
    "api-version" : "v200",
    "device-datetime" : ""/*2018-09-14T08:30:17.360Z*/,
    "geolocation" : `${responseJson.records[0].fields.latitude};${responseJson.records[0].fields.longitude}`
};

function getMoviesByLocation(){
    
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
    fetch(zipUrl).then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(responseJson => console.log(responseJson))
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
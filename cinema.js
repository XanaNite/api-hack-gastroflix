function displayCinemaResults(cinemaResponseJson){
    console.log(cinemaResponseJson);

    $('#cinema-list').empty();
    for(let i = 0; i < cinemaResponseJson.cinemas.length; i++){
        $('#cinema-list').append(
            `<li><h3>${cinemaResponseJson.cinemas[i].cinema_name}</h3>
            <p class="${cinemaResponseJson.cinemas[i].lat}" id="${cinemaResponseJson.cinemas[i].lng}">${cinemaResponseJson.cinemas[i].address}, ${cinemaResponseJson.cinemas[i].city}, ${cinemaResponseJson.cinemas[i].postcode}</p>
            <button type="button" id="${cinemaResponseJson.cinemas[i].cinema_id}">Movies and Restaurants</button>
            </li>`
        )
    };
    $('.movie-section').removeClass("hidden");
}

function getCinemasByLocation(zipResponseJson){
    const cinemaHeader = {
        headers: new Headers({
            "client" : "THIN_2",
            "x-api-key" : apiKeyMovieGlu,
            "authorization" : "Basic VEhJTl8yOlF3WlJuM0prNks2Tg==",
            "territory" : "US",
            "api-version" : "v200",
            "device-datetime" : getCurrentDateTime(),
            "geolocation" : `${zipResponseJson.records[0].fields.latitude};${zipResponseJson.records[0].fields.longitude}`
        })
    };
    const cinemaUrl = urlMovieGlu + "cinemasNearby/?n=24";

    console.log(`${zipResponseJson.records[0].fields.latitude};${zipResponseJson.records[0].fields.longitude}`);

    fetch(cinemaUrl, cinemaHeader).then(cinemaResponse => {
        if(cinemaResponse.ok){
            return cinemaResponse.json();
        }
        throw new Error(cinemaResponse.statusText);
    }).then(cinemaResponseJson => displayCinemaResults(cinemaResponseJson))
    .catch(err => {
        $('#js-error-message').text(`Something Failed: ${err.message}`);
    })
 }
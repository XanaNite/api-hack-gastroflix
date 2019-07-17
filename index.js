console.log("js attached");

let d = new Date()

const apiKeyYelp = "CjrGwySGXlQ7WM-8KxkcW6UmqNdbLrAWSPuVQ94h_oicfw2sAH7kg1QhcRDqJwwxnlYeJt7mHGQRHIxXhV-Nu9uWlwuioOzwEdY_hGELQexdt7TqTB22UMzDnBscXXYx";
const urlYelp = "https://api.yelp.com/v3/categories/";

const apiKeyMovieGlu = "0mcK8liAA823jNLp5iqfmV5lAu467j84v4OW3I6c";
const urlMovieGlu = "https://api-gate2.movieglu.com/";

function displayFilmResults(showtimeResponseJson){
    for(i = 0; i < showtimeResponseJson.films.length; i++){
        $('#cinema-list').append(
            `<li><h3>${showtimeResponseJson.films[i].film_name}</h3>
            <img src="${showtimeResponseJson.films[i].images.poster[1].medium.film_image}" alt="${showtimeResponseJson.films[i].film_name} poster">
            <img src="${showtimeResponseJson.films[i].age_rating[0].age_rating_image}" alt="age rating image">
            <h4>Standard Showtimes</h4>
            <ul class="standardShowings"></ul>
            </li>`
        )
        let timesArr = showtimeResponseJson.films[i].showings.Standard.times;
        console.log(timesArr);
        for(n = 0; n < timesArr.length; n++){
            $('.standardShowings').append(
                `<li>${timesArr[n].start_time}</li>`
            )
        }
    }
}

// function displayStandardShowingsResults(showtimeResponseJson){
//     for(i = 0; i < showtimeResponseJson.films.length; i++){
//         let timesArr = showtimeResponseJson.films[i].showings.Standard.times;
//         console.log(timesArr);
//         for(n = 0; n < timesArr.length; n++){
//             $('#standardShowings').append(
//                 `<li>${timesArr[n].start_time}</li>`
//             )
//         }
//     }
// }

// function displayImaxShowingsResults(showtimeResponseJson){
//     for(i = 0; i < showtimeResponseJson.films.showings.IMAX.times.length; i++){
//         $('#imaxShowings').append(
//             `<li>${showtimeResponseJson.films.showings.IMAX.times[i].start_time}</li>`
//         )
//     }
// }

function displayShowtimeResults(showtimeResponseJson){
    console.log(showtimeResponseJson);
    $('#cinema-list').empty();
    $('#movie-results').text(`${showtimeResponseJson.cinema.cinema_name}`);
    displayFilmResults(showtimeResponseJson);
    // displayStandardShowingsResults(showtimeResponseJson);
    // displayImaxShowingsResults(showtimeResponseJson);
}

function getMoviesForCinema(cinema){
    const showtimeHeader = {
        headers: new Headers({
            "client" : "THIN_2",
            "x-api-key" : apiKeyMovieGlu,
            "authorization" : "Basic VEhJTl8yOlF3WlJuM0prNks2Tg==",
            "territory" : "US",
            "api-version" : "v200",
            "device-datetime" : d.toISOString()
        })
    };
    console.log(d);
    console.log(d.toISOString());
    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0');
    let yyyy = d.getFullYear();
    let currentDate = yyyy + '-' + mm + '-' + dd;
    console.log(currentDate);
    const showtimeParams = {
        cinema_id: cinema,
        date: currentDate,
    };
    let showtimeQueryString = $.param(showtimeParams);
    const showtimeUrl = urlMovieGlu + "cinemaShowTimes/?" + showtimeQueryString;

    console.log(showtimeUrl);
    fetch(showtimeUrl, showtimeHeader).then(showtimeResponse => {
        if(showtimeResponse.ok){
            return showtimeResponse.json();
        }
        throw new Error(showtimeResponse.statusText);
    }).then(showtimeResponseJson => displayShowtimeResults(showtimeResponseJson))
    .catch(err => {
        $('#js-error-message').text(`Something Failed: ${err.message}`);
    })
}

function onClickDisplayMovieRestaurant(){
    $('.js-movie-results').on('click', 'li', function(){
        let cinema = $(this).find('button').attr('id');

        getMoviesForCinema(cinema);
    })
}   

function displayCinemaResults(cinemaResponseJson){
    console.log(cinemaResponseJson);
    $('#cinema-list').empty();
    for(let i = 0; i < cinemaResponseJson.cinemas.length; i++){
        $('#cinema-list').append(
            `<li><h3>${cinemaResponseJson.cinemas[i].cinema_name}</h3>
            <img src="${cinemaResponseJson.cinemas[i].logo_url}" alt="${cinemaResponseJson.cinemas[i].cinema_name} logo">
            <p>${cinemaResponseJson.cinemas[i].address}, ${cinemaResponseJson.cinemas[i].city}, AZ ${cinemaResponseJson.cinemas[i].postcode}</p>
            <button type="button" id="${cinemaResponseJson.cinemas[i].cinema_id}">Movies and Restaurants</button>
            </li>`
        )};
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
            "device-datetime" : d.toISOString(),
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

function getZipCodeLatLong(searchTerm){
    const zipParams = {
        dataset: "us-zip-code-latitude-and-longitude",
        q: searchTerm,
        format: "json"
    };
    let queryString = $.param(zipParams);
    const zipUrl = "https://public.opendatasoft.com/api/records/1.0/search?" + queryString;
    
    console.log("zip url", zipUrl);
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

function handleSubmits(){
    watchForm();
    onClickDisplayMovieRestaurant();
}

$(handleSubmits);
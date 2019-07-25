console.log("js attached");

let getCurrentDateTime = function(){
    let timezone_offset_min = new Date().getTimezoneOffset(),
	    offset_hrs = parseInt(Math.abs(timezone_offset_min/60)),
	    offset_min = Math.abs(timezone_offset_min%60),
	    timezone_standard;

    if(offset_hrs < 10)
	    offset_hrs = '0' + offset_hrs;

    if(offset_min < 10)
	    offset_min = '0' + offset_min;

// Add an opposite sign to the offset
// If offset is 0, it means timezone is UTC
    if(timezone_offset_min < 0)
	    timezone_standard = '+' + offset_hrs + ':' + offset_min;
    else if(timezone_offset_min > 0)
	    timezone_standard = '-' + offset_hrs + ':' + offset_min;
    else if(timezone_offset_min == 0)
	    timezone_standard = 'Z';

// Timezone difference in hours and minutes
// String such as +5:30 or -6:00 or Z

    let dt = new Date(),
	    current_date = dt.getDate(),
	    current_month = dt.getMonth() + 1,
	    current_year = dt.getFullYear(),
	    current_hrs = dt.getHours(),
	    current_mins = dt.getMinutes(),
	    current_secs = dt.getSeconds(),
	    current_datetime;

// Add 0 before date, month, hrs, mins or secs if they are less than 0
    current_date = current_date < 10 ? '0' + current_date : current_date;
    current_month = current_month < 10 ? '0' + current_month : current_month;
    current_hrs = current_hrs < 10 ? '0' + current_hrs : current_hrs;
    current_mins = current_mins < 10 ? '0' + current_mins : current_mins;
    current_secs = current_secs < 10 ? '0' + current_secs : current_secs;

// Current datetime
// String such as 2016-07-16T19:20:30
    current_datetime = current_year + '-' + current_month + '-' + current_date + 'T' + current_hrs + ':' + current_mins + ':' + current_secs;
    console.log("Timezone", timezone_standard, "Date and time", current_datetime, "ISO standard", current_datetime + timezone_standard);

    return current_datetime + timezone_standard;
};

const apiKeyYelp = "CjrGwySGXlQ7WM-8KxkcW6UmqNdbLrAWSPuVQ94h_oicfw2sAH7kg1QhcRDqJwwxnlYeJt7mHGQRHIxXhV-Nu9uWlwuioOzwEdY_hGELQexdt7TqTB22UMzDnBscXXYx";
const urlYelp = "https://api.yelp.com/v3/categories/";

const apiKeyMovieGlu = "BUa50YENY92YKfH6BDbBU8wqsJopPRzv1e1NqUwC";
const urlMovieGlu = "https://api-gate2.movieglu.com/";

function displayFilmResults(showtimeResponseJson){
    for(i = 0; i < showtimeResponseJson.films.length; i++){
        $('#cinema-list').append(
            `<li><h3>${showtimeResponseJson.films[i].film_name}</h3>
                <img src="${showtimeResponseJson.films[i].images.poster[1].medium.film_image}" alt="${showtimeResponseJson.films[i].film_name} poster">
                <img src="${showtimeResponseJson.films[i].age_rating[0].age_rating_image}" alt="age rating image">
                <ul class="${showtimeResponseJson.films[i].film_id}">
                    <h4>Standard Showtimes</h4>
                    <ul class="standardShowings"></ul>
                    <h4>3D Showtimes</h4>
                    <ul class="3dShowings"></ul>
                    <h4>IMAX Showtimes</h4>
                    <ul class="imaxShowings"></ul>
                </ul>
            </li>`
        )
    }
}

function displayStandardShowingsResults(showtimeResponseJson){
    for(i = 0; i < showtimeResponseJson.films.length; i++){
        let standardTimesArr = showtimeResponseJson.films[i].showings.Standard.times;
        console.log("Standard showtimes", standardTimesArr);
        for(n = 0; n < standardTimesArr.length; n++){
            $(`.${showtimeResponseJson.films[i].film_id}`).find('.standardShowings').append(
                `<li>${standardTimesArr[n].start_time}</li>`
            );
        }
    }
}

function display3dShowingsResults(showtimeResponseJson){
    for(i = 0; i < showtimeResponseJson.films.length; i++){
        let checkFor3d = showtimeResponseJson.films[i].showings;
        if (checkFor3d.hasOwnProperty('3D') === true){
            let timesArr = showtimeResponseJson.films[i].showings['3D'].times;
            console.log("3D showtimes", timesArr);
            for(n = 0; n < timesArr.length; n++){
                $(`.${showtimeResponseJson.films[i].film_id}`).find('.3dShowings').append(
                    `<li>${timesArr[n].start_time}</li>`
                );
            }
        }
    }
}

function displayImaxShowingsResults(showtimeResponseJson){
    for(i = 0; i < showtimeResponseJson.films.length; i++){
        let checkFor3d = showtimeResponseJson.films[i].showings;
        if (checkFor3d.hasOwnProperty('IMAX') === true){
            let timesArr = showtimeResponseJson.films[i].showings.IMAX.times;
            console.log("IMAX showtimes", timesArr);
            for(n = 0; n < timesArr.length; n++){
                $(`.${showtimeResponseJson.films[i].film_id}`).find('.imaxShowings').append(
                    `<li>${timesArr[n].start_time}</li>`
                );
            }
        }
    }
}

function displayShowtimeResults(showtimeResponseJson){
    console.log(showtimeResponseJson);
    $('#cinema-list').empty();
    $('#movie-results').text(`${showtimeResponseJson.cinema.cinema_name}`);
    displayFilmResults(showtimeResponseJson);
    displayStandardShowingsResults(showtimeResponseJson);
    displayImaxShowingsResults(showtimeResponseJson);
    display3dShowingsResults(showtimeResponseJson);
}

function getMoviesForCinema(cinema){
    const showtimeHeader = {
        headers: new Headers({
            "client" : "STUD_81",
            "x-api-key" : apiKeyMovieGlu,
            "authorization" : "Basic U1RVRF84MTp5Z1FGWjNNeE9tdDg=",
            "territory" : "US",
            "api-version" : "v200",
            "device-datetime" : getCurrentDateTime()
        })
    };
    let d = new Date();
    console.log("ISO UTC", d.toISOString());
    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0');
    let yyyy = d.getFullYear();
    let currentDate = yyyy + '-' + mm + '-' + dd;
    console.log("Date", currentDate);
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
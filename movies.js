function displayFilmResults(showtimeResponseJson){
    for(i = 0; i < showtimeResponseJson.films.length; i++){
        $('#cinema-list').append(
            `<li><h3>${showtimeResponseJson.films[i].film_name}</h3>
                <div>
                    <img src="${showtimeResponseJson.films[i].images.poster[1].medium.film_image}" alt="${showtimeResponseJson.films[i].film_name} poster" class="center">
                </div>
                <div>
                    <img src="${showtimeResponseJson.films[i].age_rating[0].age_rating_image}" alt="age rating image" class="center">
                </div>
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
    };
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
            "client" : moviegluUsername,
            "x-api-key" : apiKeyMovieGlu,
            "authorization" : moviegluAuthorization,
            "territory" : "US",
            "api-version" : "v200",
            "device-datetime" : getCurrentDateTime()
        })
    };
    const showtimeParams = {
        cinema_id: cinema,
        date: currentDate,
    };
    let showtimeQueryString = $.param(showtimeParams);
    const showtimeUrl = urlMovieGlu + "cinemaShowTimes/?" + showtimeQueryString;

    console.log("ISO UTC", d.toISOString());
    console.log("Date", currentDate);
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
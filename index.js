console.log("js attached");

function onClickDisplayMovieRestaurant(){
    $('.js-movie-results').on('click', 'li', function(){
        let cinema = $(this).find('button').attr('id');
        let latLocation = $(this).closest('li').find('p').attr('class');
        let lngLocation = $(this).closest('li').find('p').attr('id');
        getMoviesForCinema(cinema);
        getRestaurantResults(latLocation, lngLocation)
        $('#js-error-message').empty();
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
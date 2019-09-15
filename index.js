console.log("js attached");

function onClickDisplayMovieRestaurant(){
    $('.js-movie-results').on('click', 'button', function(){
        let cinema = $(this).attr('id');
        let latLocation = $(this).closest('li').find('p').attr('class');
        let lngLocation = $(this).closest('li').find('p').attr('id');

        console.log('cinema id', cinema);
        console.log('lat:', latLocation, ', lon:', lngLocation);

        getMoviesForCinema(cinema);
        getRestaurantResults(latLocation, lngLocation)
        $('#js-error-message').empty();
    })
}  

function watchForm(){
    $('form').submit(event => {
        $('#cinema-list').empty();
        $('#js-movie-error-message').empty();
        $('#restaurant-list').empty();
        $('.restaurant-section').addClass('hidden');
   
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
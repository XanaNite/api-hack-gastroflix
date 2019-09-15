function dispalyRestaurantResults(restaurantResponseJson){
    console.log(restaurantResponseJson);

    $('#restaurant-list').empty();
    for(i = 0; i < restaurantResponseJson.restaurants.length; i++){
        $('#restaurant-list').append(`<li>
            <h3>${restaurantResponseJson.restaurants[i].restaurant.name}</h3>
            <address>
                <div class="street-address">
                    ${restaurantResponseJson.restaurants[i].restaurant.location.address}, ${restaurantResponseJson.restaurants[i].restaurant.location.city}, ${restaurantResponseJson.restaurants[i].restaurant.location.zipcode}
                </div>
                <div class="tel">
                    Tel: ${restaurantResponseJson.restaurants[i].restaurant.phone_numbers}
                </div>
            </address>
            <div class="cuisine">
                <p>${restaurantResponseJson.restaurants[i].restaurant.cuisines}</p>
                <a href="${restaurantResponseJson.restaurants[i].restaurant.menu_url}" target="_blank">Menu</a>
            </div>
            <div class="hours">
                Hours of Operations: ${restaurantResponseJson.restaurants[i].restaurant.timings}
            </div>
        </li>`)
    };
    $('.restaurant-section').removeClass("hidden");
}

function getRestaurantResults(latLocation, lngLocation){
    let restaurantUrl = `${urlZomato}?lat=${latLocation}&lon=${lngLocation}&radius=8046&sort=real_distance`;
    const restaurantHeader = {
        headers: new Headers({
            "user-key": apiKeyZomato
        })
    };

    console.log(latLocation, lngLocation);
    console.log(restaurantUrl);

    fetch(restaurantUrl, restaurantHeader).then(restaurantResponse =>{
        if(restaurantResponse.ok){
            return restaurantResponse.json();
        }
        throw new Error(restaurantResponse.statusText);
    }).then(restaurantResponseJson => dispalyRestaurantResults(restaurantResponseJson))
    .catch(err =>{
        $('#js-error-message').text(`Something Failed: ${err.message}`);
    })
}
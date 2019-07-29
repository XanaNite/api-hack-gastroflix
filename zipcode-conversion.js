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
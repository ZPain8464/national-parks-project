const apiKey = "6G0iq4Q381g35m3I28FEoP3stft3IBGErxaiW7gs"

const searchURL = "https://developer.nps.gov/api/v1/parks"



function displayResults(responseJson) {
    console.log(responseJson)
    let parkName = "";
    let parkDesc = "";
    let parkURL = "";
    for (let i = 0; i < responseJson.data.length; i++) {
        console.log(responseJson.data[i].states)
        parkName = responseJson.data[i].fullName;
        parkDesc = responseJson.data[i].description;
        parkURL = responseJson.data[i].url;
        $('#park-results').append(`
        <li><h3>${parkName}</h3>
        <p>${parkDesc}</p>
        <p>Website: <a href="${parkURL}">${parkURL}</a></p>
        </li>`);
    }
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}


function getParksResults(query, limit) {
    const params = {
        limit,
        q: query,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params);
    const URL = searchURL + "?" + queryString;
    console.log(URL)
    fetch(URL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
    console.log('watchForm ran')
    $('#js-form').submit(event => {
        event.preventDefault();
        $('#results-list').empty();
        const searchTerms = $('#js-desired-states').val();
        const maxResults = $('#js-max-results').val();
        console.log(searchTerms);
        console.log(maxResults);
        getParksResults(searchTerms, maxResults);

    })
}

function clearForm() {
    $('#clear').on('click', function() {
        $('#park-results').empty();

    })
}

function handleApp() {
    watchForm();
    clearForm();
}

$(handleApp())
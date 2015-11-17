SC.initialize({
	client_id: '92c4a7cc969806a86bb2004c626dfc99'
});

var favLimit = 10;
var page_size = 10;
var tempUserId;
var tempFavTrack;
var trackExistsAlready;
var favoritesList = [];
var favoritesCount = [];
var one = 1;
var cities;
var numCities;
var users = [];
var numUsers;
var favorites = [];

function cityData(sentCities) {
    cities = sentCities;
    numCities = cities.length;
    processCityData(0);
}

var counter = 0;
var firstCall = true;

function processCityData(lastUsers) {
    if (!firstCall) {
        for (var j = 0; j < lastUsers.length; j++) {
            users.push(lastUsers[j]);
        }
    }
    else
    {
        firstCall = false;
    }
    if (counter < numCities) {
        SC.get('/users', {
          q: cities[counter],
          limit: page_size
       }).then(processCityData);
            counter++;
        }
        else {
            numUsers = users.length;
            parseUsers(0);
        }
}

var counter2 = 0;
firstCall = true;

function parseUsers(lastFavorites) {
    if (!firstCall)
    {
        for (var n = 0; n < lastFavorites.length; n++)
        {
            favorites.push(lastFavorites[n]);
        }
    }
    else
    {
        firstCall = false;
    }

        if (counter2 < numUsers) {
            tempUserId = users[counter2].id;
            SC.get('/users/' + tempUserId + '/favorites'
                ).then(parseUsers);
            counter2++;
        }
        else {
            parseFavorites();
        }
    }

function parseFavorites() {
    var skipCount;
    for (var i = 0; i < favorites.length; i++)
    {
        if (favorites[i].title.charAt(1) == favorites[favorites.length - 1].title.charAt(1))
            console.log(favorites[i].title);
    }
    console.log('end!');
}
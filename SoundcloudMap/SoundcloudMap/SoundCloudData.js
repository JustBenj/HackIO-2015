SC.initialize({
	client_id: '92c4a7cc969806a86bb2004c626dfc99'
});

var favLimit = 20;
var page_size = 50;
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
    cities = ["Columbus, OH", "Springfield, OH", "Mansfield, OH", "Grove City, OH"];
    numCities = cities.length;
    processCityData(0);
}

var counter = 0;

function processCityData(lastUsers) {
    if (lastUsers != null) {
        for (var j = 0; j < lastUsers.length; j++)
        {
            users.push(lastUsers[j]);
        }

        if (counter < numCities) {
            SC.get('/users', {
                q: cities[counter],
                limit: page_size
            }
	        ).then(processCityData);
            counter++;
        }
        else {
            numUsers = users.length;
            parseUsers(0);
        }
    }
}

var counter2 = 0;

function parseUsers(lastFavorites) {
    if (lastFavorites.length != 0) {
        for (var n = 0; n < lastFavorites.length; n++)
        {
            favorites.push(lastFavorites[n]);
        }
        if (counter2 < numUsers) {
            tempUserId = users[counter2].id;
            SC.get('/users/' + tempUserId + '/favorites',
                {limit: favLimit }
                ).then(parseUsers);
            counter2++;
        }
        else {
            parseFavorites();
        }
    }
}

function parseFavorites() {
    var canAdd;
    for (var k = 0; k < favorites.length; k++) {       
        canAdd = true;
        for(var q = 0; favorites[k].title != null && q < favoritesList.length && !canAdd; q++)
        {
            if(favoritesList[q] == favorites[k]){
                favoritesCount[q] = favoritesCount[q] + 1;  
                canAdd = false;
            }
        }            
        if(canAdd && favorites[k].title != null)
        {
            favoritesList.push(favorites[k].title);
            favoritesCount.push(1);
        }       
    }
    console.log(favoritesList);
    console.log(Math.max.apply(null,favoritesCount));
}
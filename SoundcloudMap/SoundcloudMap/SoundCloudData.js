SC.initialize({
	client_id: '92c4a7cc969806a86bb2004c626dfc99'
});

var page_size = 200;

function cityData(cities) {
    console.log(cities);

    for (var i = 0; i < cities.length; i++){}
	    SC.get('/users', {
	        q: cities[i].toString(),
	        limit: page_size,
	        linked_partitioning: 1
	    }
	    ).then(function (users) {
		    console.log(users);
	    });

    {}

}
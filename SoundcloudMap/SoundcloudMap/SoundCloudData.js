SC.initialize({
		client_id: '92c4a7cc969806a86bb2004c626dfc99'
	});
	
	var page_size = 200;
	var usersInTowns = ["hello", "hey"];
		
	SC.get('/users', { 
		q: 'columbus, OH',
		limit: page_size,
	  	linked_partitioning: 1
		}
		).then(function(users) {
			console.log(users);
		});
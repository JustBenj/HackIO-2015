SC.initialize({
	client_id: '92c4a7cc969806a86bb2004c626dfc99'
});

var usersInTowns = [""];

SC.get('/users', {
		city: ''
		}).then(usersInTowns.push(user));
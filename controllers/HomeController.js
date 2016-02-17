
people = [
	{
		firstName: "Jhon",
		lastName: "Deep"
	},
	{
		firstName: "Alex",
		lastName: "Muril"
	}
]


exports.Index = function(request, response){
response.render('home/Index', {
			content: 'This is some content',
			published: true,
			people: people
		});
};

exports.Other = function(request, response){
    response.render('home/Other');
};
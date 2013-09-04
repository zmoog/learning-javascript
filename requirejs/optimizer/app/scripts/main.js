requirejs.config({
	paths: {
		'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min'
	}
})

require(["jquery", "one", "two", "three"], function ($, one, two, three) {

	console.log('module main - check');

	console.log('adding', one.add(1,2));

});

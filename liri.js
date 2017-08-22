// write the code you need to grab the data from keys.js. Then store the keys in a variable.
// var keys = require("./keys.js") 

// set up key datas for bash-profile
// var spotifyKeys = {
// 	spotify_id: process.env.SPOTIFY_ID,
// 	spotify_secret: process.env.SPOTIFY_SECRET
// };

// var omdbKeys = {
// 	omdb_key: process.env.OMDB_API_KEY
// };

// var twitterKeys = {
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// };

// console.log(twitterKeys);

// Make it so liri.js can take in one of the following commands:
// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says
var fs = require('fs');
var twitter = require('twitter');
// var spotify = require('spotify');
var request = require('request');
var arg = process.argv[2];

// var keys = require('./bash-profile');
// console.log(keys);

// commands for liri to work
switch(arg) {
	case "my-tweets": 
		myTweets(); 
		break;
	case "spotify-this-song": 
		spotifyThisSong(); 
		break;
	case "movie-this": 
		movieThis(); 
		break;
	case "do-what-it-says": 
		doWhatItSays();
		break;
	default: 
		console.log("What are you talking about?");

};

// // twitter section
var myTweets = function() {
	var client = new twitter({
  		consumer_key: process.env.TWITTER_CONSUMER_KEY,
  		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var params = {screen_name: 'Brandon lee', count: 20};

	client.get('statuses/user_timeline', params, function(error, tweets, response){
  		if (!error) {

  			// make empty array for data
  			var data = [];

  			for (var i = 0; i < tweets.length; i++) {
  				data.push ({
  					'Date: ' : tweets[i].created_at,
  					'Tweets: ' : tweets[i].text,
  				});
  			}
    		console.log("testing");
  		}
	});

}



// spotify section
// var getArtistNames 

// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     // Do something with 'data' 
// });

// // // omdb section 
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred 
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
//   console.log('body:', body); // Print the HTML for the Google homepage. 
// });

// for logging to log.txt section
// var writeToLog = function(data) {
// 	fs.appendFile("log.txt", '\r\n\r\n');

// 	fs.appendFile("log.txt", JSON.stringify(data), function(error){
// 		if (error) {
// 			return console.log(error);
// 		}
// 		console.log("log.txt is updated");
// 	});
// }


// What Each Command Should Do

// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
// Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
// Step One: Visit https://developer.spotify.com/my-applications/#!/
// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package. See the
// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
// It's on Netflix!
// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use 40e9cece.
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file.
// Do not overwrite your file each time you run a command.

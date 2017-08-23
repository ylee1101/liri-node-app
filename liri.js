// to connect with other programs

var fs = require('fs');
var keys = require('./keys.js') 
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var liriArg = process.argv[2];

// commands for liri to work

switch(liriArg) {
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
		console.log("What are you trying to do? Try again with my-tweets or spotify-this-song or movie-this or do-what-it-says.");

};

// // twitter section

function myTweets() {
	var client = new twitter({
  		consumer_key: keys.twitterKeys.consumer_key,
  		consumer_secret: keys.twitterKeys.consumer_secret,
  		access_token_key: keys.twitterKeys.access_token_key,
  		access_token_secret: keys.twitterKeys.access_token_secret
	});

	var twitterUsername = process.argv[3];
	// show my tweet if username is not typed
	if (!twitterUsername) {
		twitterUsername = "brandonyhlee";
	}

	params = {screen_name: twitterUsername, count: 21};

	client.get('statuses/user_timeline', params, function(error, data, response){
  		if (!error) {

  			for (var i = 0; i < data.length; i++) {
  				var twitterResults = 
  				"@" + data[i].user.screen_name + ": " + 
  				data[i].text + "\r\n" + 
  				data[i].created_at + "\r\n" +
  				"------------------------------ " + i + " ------------------------------" + "\r\n";

  				console.log(twitterResults);
  				log(twitterResults);
  				
  			}
  		}
  		else {
  			console.log("Error");
  			return;
  		}
	});

}

// spotify section

function spotifyThisSong(spotifySong) {
	var spotifySong = process.argv[3];
	
	if(!spotifySong) {
		spotifySong = "The Sign";
	}

	params = spotifySong;

	spotify.search({ type: 'track', query: params }, function(err, data) {
    	if ( err ) {
       		console.log('Error occurred: ' + err);
        	return;
    	}
    	else {
    		var songInfo = data.tracks.items;
    		
    		for (var i = 0; i < 5; i++) {
    			if (songInfo[i]!= undefined) {
    				var spotifyResults = 
    				"Artist: " + songInfo[i].artists[0].name + "\r\n" + 
    				"Song: " + songInfo[i].name + "\r\n" +
    				"Album: " + songInfo[i].album.name + "\r\n" +
    				"-------------" + i + "---------" + "\r\n";
    				console.log(spotifyResults);
    				log(spotifyResults);

    			}
    		}
    	}
	});
}

// // // omdb section 

function movieThis(){
		var movie = process.argv[3];
			if(!movie){
				movie = 'Mr. Nobody.';
			}
		
		params = movie

		request("http://www.omdbapi.com/?t=" + params + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				console.log(movieObject); // Show the text in the terminal
				var movieResults =
				"------------------------------ begin ------------------------------" + "\r\n"
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
				"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\r\n" + 
				"------------------------------ finish ------------------------------" + "\r\n";
				console.log(movieResults);
				log(movieResults); // calling log function
			} 
			else {
				console.log("Error :"+ error);
				return;
			}
		});
	};


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data){
		if (!error) {
			doWhatItSaysResults = data.split(",");
			spotifyThisSong(doWhatItSaysResults[0], doWhatItSaysResults[1]);
		} 
		else {
			console.log("Error occurred" + error);
		}
	});
};

function log(logResults) {
  fs.appendFile("log.txt", logResults, (error) => {
    if(error) {
      throw error;
    }
  });
}


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


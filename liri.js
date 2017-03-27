//Twitter API
var myTwitter = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var consumerKey = myTwitter.twitterKeys.consumer_key;
var consumerSecret = myTwitter.twitterKeys.consumer_secret;
var accessToken = myTwitter.twitterKeys.access_token_key;
var accessTokenSecret = myTwitter.twitterKeys.access_token_secret;

var client = new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
});//end client Twitter constructor

var spotifySongArr = [];
var movieArr = [];

//when the user types my-tweets
var user = process.argv[2];
var search = process.argv;

//the maximum number of tweets to display
var count = 20;
    //when user enters my-tweets for current tweets
    if (user === "my-tweets") {
        client.get('statuses/user_timeline.json?screen_name=portillaj20&' + count, function (error, tweets, response) {
            //console.log(JSON.stringify(tweets, null, 2));
            for (var i = 0; i < tweets.length; i++) {
                console.log("===================Tweet:" + (i + 1) + "======================");
                console.log(JSON.stringify(tweets[i].created_at, null, 2));
                console.log(JSON.stringify(tweets[i].text, null, 2));
                console.log("================================================");
            }//end for loop

        });//end function
    } 

    //when user enters a song title
    if(user === "spotify-this-song" && process.argv[3] !== ""){
        
        for(var i = 3; i < search.length; i++){
            spotifySongArr.push(search[i]);
        }//end for loop
        var getSong = spotifySongArr.join(" ");
        //console.log(getSong);
        //spotify api call
        spotify.search({ type: 'track', query: getSong }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
                console.log("=========================================");
                //artist name
                console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                //song name
                console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
                //preview link of the song
                console.log("Preview Song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
                console.log("=========================================");
            });//end function
    }

    //when user enters movie title
    if(user === "movie-this" && process.argv[3] !== ""){
        for(var i = 3; i < search.length; i++){
            movieArr.push(search[i]);
        }//end for loop
        var getMovie = movieArr.join(" ");
    
      request('http://www.omdbapi.com/?t=' + getMovie, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred 
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      
      console.log("=============================================================");
      //Movie title 
      console.log("Movie Title: " + JSON.parse(body).Title);
      //Year the moive came out
      console.log("Year Released: " + JSON.parse(body).Year);
      //IMDB Rating of the movie
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      //Country where the movie was produced
      console.log("Country Produced: " + JSON.parse(body).Country);
      //Language of the Movie
      console.log("Language of Movie: " + JSON.parse(body).Language);
      //Plot of Movie
      console.log("Movie Plot: " + JSON.parse(body).Plot);
      //Actors in the movie
      console.log("Actors: " + JSON.parse(body).Actors);
      //rotten tomatoes rating
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      //rotten tomatoes website
      console.log("Rotten Tomatoes Website: https://www.rottentomatoes.com/");
      console.log("=============================================================");
    });//end movie function
}//end if



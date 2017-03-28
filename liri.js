//Twitter API
var myTwitter = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

//twitter keys
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

//empty arrays for spotify and movie functions
var spotifySongArr = [];
var movieArr = [];

//when the user types my-tweets
var user = process.argv[2];
var search = process.argv;
var notEmpty = process.argv[3];
var getMovie = '';
var count = 20; //the maximum number of tweets to display

//switch statement that goes through each command the user enters
switch(user){
  case 'my-tweets':
    getTweets(); //calls function
    writeFile(); //calls function
    break;
  case 'spotify-this-song':
    getSong(); //calls function
    writeFile(); //calls function
    break;
  case 'movie-this':
    getMovieData(); //calls function
    writeFile(); //calls function
    break;
  case 'do-what-it-says':
    readFile(); //calls function
    writeFile(); //call function
    break;
}//end switch 

//function that gets tweets, max limit is 20
function getTweets(){
    client.get('statuses/user_timeline.json?screen_name=portillaj20&' + count, function (error, tweets, response) {
        //console.log(JSON.stringify(tweets, null, 2));
        for (var i = 0; i < tweets.length; i++) {
            console.log("===================Tweet:" + (i + 1) + "======================");
            console.log(JSON.stringify(tweets[i].created_at, null, 2));
            console.log(JSON.stringify(tweets[i].text, null, 2));
            console.log("================================================");
        }//end for loop
    });//end function
}//end function

//get song function that gives you info on the what the user provides
function getSong(){
    var getSong = '';
    if(notEmpty != '' && notEmpty != null){
        for(var i = 3; i < search.length; i++){
            spotifySongArr.push(search[i]);
        }//end for loop
        getSong = spotifySongArr.join(" "); //variable that gets the word
    }else{
        getSong = 'The Sign'; //if the user does not enter a song, this is the default
    }//end else
        
    //spotify search function
    spotify.search({ type: 'track', query: getSong }, function(err, data) {
        if(err) {
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
}//end function

//function that get information from movie provided by user
function getMovieData(){
    if(notEmpty != '' && notEmpty != null){
        for(var i = 3; i < search.length; i++){
            movieArr.push(search[i]);
        }//end for loop
        getMovie = movieArr.join(" ");
    }else{
        getMovie = 'Mr. Nobody'; //default movie title if user does not enter anything
    }//end else

        request('http://www.omdbapi.com/?t=' + getMovie, function (error, response, body) {
          console.log(JSON.stringify(body, null, 2));
      
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
          console.log("Rotten Tomatoes Website: " + JSON.parse(body).Website);
          
          console.log("=============================================================");
        });//end movie function
}//end function

//function that reads the text in file
function readFile(){
fs.readFile("random.txt", "utf8", function(error, response){
    console.log(response);
     spotify.search({ type: 'track', query: response }, function(err, data) {
        console.log("=========================================");
        //artist name
        console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
        //song name
        console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
        console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
        //preview link of the song
        console.log("Preview Song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
        console.log("=========================================");
     });//end spotify function
  });//readFile function
}//end function

//function that writes to log.txt the movie and songs your searched for
function writeFile(){
  if(user === "movie-this"){
     fs.appendFile("log.txt", "added " + getMovie + ", ");
 }else if(user === "spotify-this-song"){
     fs.appendFile("log.txt", "added " + getSong + ", ");
 }//end else if
}//function
//Twitter API
var myTwitter = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
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

//when the user types my-tweets
var user = process.argv[2];
var searchSpotify = process.argv;

//the maximum number of tweets to display
var count = 20;

    if (user === "my-tweets") {
        client.get('statuses/user_timeline.json?screen_name=portillaj20&' + count, function (error, tweets, response) {

            for (var i = 0; i < count; i++) {
                console.log(JSON.stringify(tweets[i].created_at, null, 2));
                console.log(JSON.stringify(tweets[i].text, null, 2));
                console.log("");
            }//end for loop

        });//end function
    } else if(user === "spotify-this-song" && searchSpotify != ""){
        for(var i = 3; i < searchSpotify.length; i++){
            spotifySongArr.push(searchSpotify[i]);
        }//end for loop
        var getSong = spotifySongArr.join(" ");

        spotify.search({ type: 'track', query: getSong }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log(JSON.stringify(data, null, 2));
            // items[].artists;
            // tracks.name;

        });
}

console.log(getSong);


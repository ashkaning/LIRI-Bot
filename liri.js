require("dotenv").config();

var keys = require("./keys.js");
var axios = require('axios');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var funcSearch = process.argv[2];
var KeySearch = process.argv[3];

var concertUrl = "https://rest.bandsintown.com/artists/" + KeySearch + "/events?app_id=codingbootcamp";
var movieUrl = "http://www.omdbapi.com/?t=" + KeySearch + "&y=&plot=short&apikey=trilogy";

if (funcSearch === 'concert-this') {
    axios.get(concertUrl).then(
        function (concertResponse) {
            for (var i in concertResponse.data) {
                console.log("Venue Name: " + concertResponse.data[i].venue.name);
                console.log("Locations: " + concertResponse.data[i].venue.city + " " + concertResponse.data[i].venue.city.country);
                console.log("Date: " + concertResponse.data[i].datetime);
                console.log('====================================');
            }

        }).catch(function (error) {
            console.log(error);
        })
}

if (funcSearch === 'spotify-this-song') {
    spotify.search({ type: 'track', query: KeySearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var dataArray = JSON.stringify(data, null, 3)
        for (var i in data.tracks.items) {
            console.log('Artist Name: ' + data.tracks.items[i].album.name);
            console.log('Song Name: ' + data.tracks.items[i].name);
            console.log('Preview URL: ' + data.tracks.items[i].preview_url);
            console.log('Album: ' + data.tracks.items[i].album.artists[0].name);
            console.log('====================================');
        }
    });
}

if (funcSearch === 'movie-this') {
    axios.get(movieUrl).then((response)=>{
        console.log("Title: "+response.data.Title);
        console.log("Title: "+response.data.Year);
        console.log("Rating: "+response.data.Ratings[0].Value); 
        console.log("Rotten Tomatoes Rating of the movie: "+response.data.Ratings[1].Value);
        console.log("Country where the movie was produced: "+response.data.Country);
        console.log("Language of the movie: "+response.data.Language);
        console.log("Plot of the movie: "+response.data.Plot);
        console.log("Actors in the movie: "+response.data.Actors);
        console.log('====================================');
    }).catch((err)=>{
        console.log(err);
    })
}

if (funcSearch === 'do-what-it-says') {

}
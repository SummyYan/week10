//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();//create an instance of express
let path = require('path');
mongoose.connect('mongodb://localhost:27017/movies',{ useNewUrlParser: true,useUnifiedTopology: true  }, function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
app.listen(8000);
app.use('/', express.static(path.join(__dirname, "dist/movieAng")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);//reference to the object actors and access to its attribute getAll
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorID/:movieID', actors.deleteOneMovie);
app.put('/actors50P4',actors.incre50By4);
//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieID/:actorID', movies.deleteOneActor);
app.get('/moviesBetween/:year1/:year2', movies.getBetweenYears);
app.delete('/moviesBefore/:aYear', movies.deleteBefore);
//
// app.delete('/actorMovies/:id', movies.deleteActorMovies);//?ony execute the first one

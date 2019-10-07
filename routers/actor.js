const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');
const movies = require('./movie');
module.exports = {
    getAll: function (req, res) {
        Actor.find().populate('movies').exec(function (err, actors) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actors);
            }
        });
    },
    createOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            if (err) return res.status(400).json(err);
            res.json(actor);
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err,actor) {
            if (err) return res.status(400).json(err);
            return res.json(actor);
        });
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });
    },
    // deleteOneNMovies:function (req,res) {
    //     Actor.findOneAndRemove({ _id: req.params.id }, function (err,actor) {
    //         if (err) return res.status(400).json(err);
    //         actor.movies.forEach(function(movieID){
    //             movies.deleteOne(movieID);
    //         })
    //     });
    // }
    deleteOneMovie: function (req,res) {
        Actor.findByIdAndUpdate(req.params.actorID,{$pull:{'movies':req.params.movieID}} ,function (err) {
            if (err) return res.status(400).json(err);
            res.json(); 
        })
    },
    incre50By4: function (req, res) {
        let date= new Date();
        Actor.updateMany({ bYear:{$lte: date.getFullYear()-50}}, {$inc:{bYear: -4}}, function (err, update) {
            if (err) return res.status(400).json(err);
            if (!update) return res.status(404).json();
            res.json(update);
        });
    },
};
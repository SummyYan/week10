var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
// const actors = require('./actor');
module.exports = {
    getAll: function (req, res) {
        Movie.find().populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')//populate the attribute name
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    deleteActorMovies:function (req,res) {
        Actor.find({ _id: req.params.id },function (err,actor) {
            if (err) return res.status(404).json(err);
            if(!Array.isArray(actor.movies)||actor.movies.length<=0){
                Actor.findByIdAndDelete(req.params.id);
                res.json({msg:'successfully delete the actor while there is no movies of this actor'});
            }else{
            actor.movies.forEach(function (element) {
                Movie.findByIdAndRemove(element, function (err) {
                    if (err) return res.status(400).json(err);
                    Actor.findByIdAndDelete(req.params.id);
                    res.json({msg:'successfully delete the actor and all the movies of this actors'});
                })
            })

        }
        })
        
        // Movie.deleteMany({'actors':{$in: req.params.id}},function (err) {
        //     if (err) return res.status(400).json(err);
        //     res.json();
        // })
    },
    // deleteSome: function (req,res) {
    //     req.body.movies.toArray().forEach(function(movieID){
    //         Movie.findOneAndRemove({_id: movieID},function (err) {
    //             if (err) {
    //                 return res.status(400).json(err);
    //             } else {
    //                 res.json();
    //             }
    //         });
    //     })
    // }
    deleteOneActor: function (req,res) {
        Movie.findByIdAndUpdate(req.params.movieID,{$pull:{'actors':req.params.actorID}} ,function (err) {
            if (err) return res.status(400).json(err);
            res.json(); 
        })
    },
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.id }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        });
    },
    getBetweenYears: function (req,res) {//year1>year2
        Movie.find({$and: [{'year':{$gte:parseInt(req.params.year2)}},{'year':{$lte:parseInt(req.params.year1)}}]},function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    deleteBefore:function(req,res){
        Movie.deleteMany({'year':{$lt:parseInt(req.params.aYear)}},function (err,movies) {
            if (err) {
                return res.status(400).json(err);
            } else {
                res.json(movies);
            }
        });
    }
};
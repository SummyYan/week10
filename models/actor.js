const mongoose = require('mongoose');
const actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    bYear: {
        validate: {
            validator: function (newAge) {
                if (Number.isInteger(newAge))
                    return true;
                else return false
            },
            message: 'Birth year should be integer'
        },
        type: Number,
        required: true
    },
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]// an array of objects, which have references to Movie
});


module.exports = mongoose.model('Actor', actorSchema);
// let actorModel = mongoose.model('Actor', actorSchema);
// module.exports =actorModel;


// const mongoose = require('mongoose');
// const userSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     name: String,
//     cars: [{
//         type: mongoose.Schema.ObjectId,
//         ref: 'Car'
//     }],
//     address: String
// });
// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');
// const carSchema = new mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     maker: String,
//     year: Number,
//     users: [{
//         type: mongoose.Schema.ObjectId,
//         ref: 'User'
//     }]
// });
// module.exports = mongoose.model('Car', carSchema);
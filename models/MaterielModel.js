const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    materielName: String,
    matrielImage: String,
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: String
    }],
    addedAt: {
        type: Date
    }

});


module.exports = mongoose.model('Materiel', materialSchema);
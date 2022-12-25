const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: String,
    eventImage: String,
    description:String,
    snippet:String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
lag:Number,
lat:Number,
img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SingleFile'
}
});

module.exports = mongoose.model('event', EventSchema);
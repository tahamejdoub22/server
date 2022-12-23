const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

const typeSchema = new mongoose.Schema({
    type_name: {type: String,unique: true},
    typeImage: String,
    description:String,
        createdAt: {
        type: Date,
        default: Date.now()
    }
});
typeSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Type', typeSchema);
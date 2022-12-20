const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        FirstName: {
            type: 'string',
            required: true
        },
        LastName: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        avatar: {
            type: 'string',
            default: ''
        },
        address:String,
        Phone:Number,
        codePostal:Number,
        city:String,
        country:String,
  
        points:{
            type:Number,
        }
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


module.exports = mongoose.model('User', userSchema);
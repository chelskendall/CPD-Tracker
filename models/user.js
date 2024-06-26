const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// create user Schema
const UserSchema = new Schema({
    email: {
        type: String,
        minlength: 3,
        required: [true, 'Email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 3
    },
    passwordConfirmation: {
        type: String,
        required: [false],
        minlength: 3
    }

}
);

const User = mongoose.model('User', UserSchema); // passing the name of the collecton in database
module.exports = User;
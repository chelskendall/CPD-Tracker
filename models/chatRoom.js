const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Chatroom Schema
const ChatroomSchema = new Schema({
    email: {
        type: String,
        required: [true],
        ref: "User"
    },
    created: {
        type: Date,
        required: [true]
    },
    fromText: {
        type: String,
        required: [true]
    },
    toText: {
        type: String,
        required: [true]
    },
    idChat: {
        type: String,
        required: [true]
    }
});

// passing the name of the collecton in database
const ChatRoom = mongoose.model('chatRoom', ChatroomSchema);
module.exports = ChatRoom;
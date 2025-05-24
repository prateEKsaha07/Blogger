const {Schema} = require('mongoose');
const User = require('./User');
const mongoose = require('mongoose');

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    tags:{
        type: [String],
        default: [],
    },
    category:{
        type: String,
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
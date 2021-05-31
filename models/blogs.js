const mongoose = require('mongoose');
const Review = require('./reviews');

const blogsSchema = new mongoose.Schema({
    author : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    img : {
        type: String
    },
    content : {
        type: String
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

const Blog = mongoose.model('Blog',blogsSchema);

module.exports = Blog;
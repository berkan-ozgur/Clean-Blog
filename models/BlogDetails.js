const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: Date
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog
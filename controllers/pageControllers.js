const Blog = require('../models/BlogDetails')

exports.getAboutPage = (req, res) => {
    res.render('about')
}

exports.getAddPage = (req, res) => {
    res.render('add_post')
}

exports.getBlogDetailPage = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('post', {
        blog
    })
}

exports.getEditPage = async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    res.render('edit', {
        blog
    })
}
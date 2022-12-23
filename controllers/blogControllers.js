const Blog = require('../models/BlogDetails')

exports.getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort('-dateCreated')
    res.render('index', {
        blogs
    })
}

exports.deleteBlog = async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.redirect('/')
}

exports.updateBlog = async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    blog.title = req.body.title
    blog.detail = req.body.detail
    blog.save()
    res.redirect(`/blogs/${req.params.id}`)
}

exports.createBlog = async (req, res) => {
    await Blog.create(req.body)
    res.redirect('/')
}
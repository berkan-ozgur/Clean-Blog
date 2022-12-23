const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejs = require('ejs')
const Blog = require('./models/BlogDetails')


const app = express();

mongoose.set('strictQuery', true)
mongoose.connect(
    "mongodb://127.0.0.1/blog-db",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }))

app.get('/', async (req, res) => {
    const blogs = await Blog.find({}).sort('-dateCreated')
    res.render('index', {
        blogs
    })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add_post', (req, res) => {
    res.render('add_post')
})
app.post('/blog', async (req, res) => {
    await Blog.create(req.body)
    res.redirect('/')
})
app.get('/blogs/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('post', {
        blog
    })
})
app.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.redirect('/')
})
app.get('/blogs/edit/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    res.render('edit', {
        blog
    })
})
app.put('/blogs/:id', async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id })
    blog.title = req.body.title
    blog.detail = req.body.detail
    blog.save()
    res.redirect(`/blogs/${req.params.id}`)
})
const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı!...`)
})
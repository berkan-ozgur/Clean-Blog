const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const ejs = require('ejs')
const Blog = require('./models/BlogDetails')
const blogController = require("./controllers/blogControllers")
const pageController = require("./controllers/pageControllers")

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

app.get('/', blogController.getAllBlogs)
app.get('/about', pageController.getAboutPage)
app.get('/add_post', pageController.getAddPage)
app.get('/blogs/:id', pageController.getBlogDetailPage)
app.delete('/blogs/:id', blogController.deleteBlog)
app.put('/blogs/:id', blogController.updateBlog)
app.get('/blogs/edit/:id', pageController.getEditPage)
app.post('/blog', blogController.createBlog)


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı!...`)
})
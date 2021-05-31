const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');
const Review = require('../models/reviews');
const {isLoggedIn} = require('../middleware');


// To get all Blogs
router.get('/blogs',async(req,res)=>{
    try{
        const blogs = await Blog.find({});
        res.render('blogs/show',{blogs});
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot find blogs');
        res.redirect('/error');
    }
})

// To get new blogs form
router.get('/blogs/new',isLoggedIn,(req,res)=>{
    res.render('blogs/new');
})

// To save the blog
router.post('/blogs',async(req,res)=>{
    try{
        await Blog.create(req.body);
        req.flash('success','Blog created successfully');
        res.redirect('/blogs');
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot create blog');
        res.redirect('/error');
    }
})

// To see specific Blog post
router.get('/blogs/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const blogData = await Blog.findById(id).populate('reviews');
        res.render('blogs/viewBlog',{blogData});
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot find blog');
        res.redirect('/error');
    }
})

// To get edit form
router.get('/blogs/:id/edit',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        const blogData = await Blog.findById(id);
        res.render('blogs/edit',{blogData});
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot find page');
        res.redirect('/error');
    }
})

// To update details by patch req
router.patch('/blogs/:id',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        await Blog.findByIdAndUpdate(id,req.body);
        req.flash('success','Blog updated successfully!');
        res.redirect(`/blogs/${id}`);
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot update blog');
        res.redirect('/error');
    }
})

// To delete blog
router.delete('/blogs/:id',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        await Blog.findByIdAndRemove(id);
        req.flash('success','Blog deleted successfully');
        res.redirect('/blogs');
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot delete blog');
        res.redirect('/error');
    }
})

// blogs comment route
router.post('/blogs/:id/review',isLoggedIn,async(req,res)=>{
    try{
        const {id} = req.params;
        const myBlog = await Blog.findById(id);
        const review = new Review({
            user: req.user.username,
            ...req.body});

        myBlog.reviews.push(review);

        await review.save();
        await myBlog.save();
        req.flash('success','You have commented successfully');
        res.redirect(`/blogs/${id}`);
    }catch(e){
        console.log(e.message);
        req.flash('error','Cannot create comment');
        res.redirect('/error');
    }
})

// Error page
router.get('/error',(req,res)=>{
    res.render('partials/error');
})

module.exports = router;
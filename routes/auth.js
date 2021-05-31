const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

// Register Page
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

// Save user to db
router.post('/register',async(req,res)=>{
    const user = new User({email: req.body.email, username: req.body.username});
    const newUser = await User.register(user,req.body.password);
    // console.log(newUser);
    req.flash('success','User Registered Successfully');
    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})

router.post('/login',passport.authenticate('local',{ 
    failureRedirect: '/login',
    failureFlash: true
    }),(req,res)=>{
        req.flash('success',`Welcome back ${req.user.username} :)`);
        res.redirect('/blogs');
    }
)

router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success',`Account logged out Successfully!`);
    res.redirect('/login');
})

module.exports = router;
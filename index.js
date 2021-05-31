if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const seedDB = require('./seed');

// Routes
const blogRoutes = require('./routes/blogs');
const authRoutes = require('./routes/auth');

// Database stuff begin
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log("OH NO ERROR!!!");
    console.log(err);
});


// seedDB();

// Database stuff end

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'iamlucifer',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.userName = req.user;
    next();
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.use(blogRoutes);
app.use(authRoutes);

app.listen(process.env.PORT || 8080,()=>{
    console.log('Server is working on port 8080');
})

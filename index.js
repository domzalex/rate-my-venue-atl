const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const sessionStore = require('express-session');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const Performers = require("./models/performer");
const User = require("./models/user");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('connected to db');
    app.listen(8080, () => console.log('lets go baby')); 
});

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({ 
    secret: "Super epic secret", 
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session()); 
  
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 



app.get('/', (req, res) => {
    Performers.find({}, (err, entries) => {
        res.render('Main.ejs', {performers: entries});
    });
});
//gets user registration
app.get('/register', (req, res) => {
    res.render('register.ejs');
})

//gets login/logout
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
app.get("/logout", (req, res) => { 
    req.logout(); 
    res.redirect("/"); 
}); 
app.get('/userProfile', isLoggedIn, (req, res) => {
    var user = req.user;
    Performers.find({}, (err, entries) => {
        res.render('userProfile.ejs', { performers: entries, user: user });
    }).sort({_id: -1});
});
app.post('/', (req, res) => {
    const venue = req.body.venue;
    Performers.find({}, (err, entries) => {
        res.render('Venue.ejs', {performers: entries, req: req, venue: venue});
    }).sort({_id: -1});
});
//posts registration 
app.post("/register", (req, res) => { 
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password 
    User.register(new User({ username: username, name: name }), 
            password, (err, user) => { 
        if (err) { 
            console.log(err); 
            return res.render("register.ejs"); 
        } 
        passport.authenticate("local")( 
            req, res, () => { 
            res.redirect("/create"); 
        });
    }); 
}); 

//posts login
app.post("/login", passport.authenticate("local", { 
    successRedirect: "/create", 
    failureRedirect: "/login"
}), (req, res) => {
}); 
app.get('/contact', (req, res) => {
    res.render('Contact.ejs');
});
app.get('/create', isLoggedIn, (req, res) => {
    var user = req.user;
    Performers.find({}, (err, entries) => {
        res.render('Create.ejs', {performers: entries, name: user.name});
    });
});


app.post('/create', async (req, res) => {
    const performers = new Performers({
        name: req.body.name,
        venue: req.body.venue,
        communication: req.body.communication,
        marketing: req.body.marketing,
        stage: req.body.stage,
        management: req.body.management,
        equipment: req.body.equipment,
        engineer: req.body.engineer,
        loadin: req.body.loadin,
        timing: req.body.timing,
        pay: req.body.pay,
        reliability: req.body.reliability,
        discount: req.body.discount,
        comments: req.body.comments
    });
    console.log(req.body);
    try {
        await performers.save();
        res.redirect("/");
    } catch (err) {
        console.log(err)
        res.redirect("/");
    }
});
function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.redirect("/login"); 
} 



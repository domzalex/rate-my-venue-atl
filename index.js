const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Performers = require("./models/performer");

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

app.get('/', (req, res) => {
    Performers.find({}, (err, entries) => {
        res.render('Main.ejs', {performers: entries});
    });
});
app.post('/', (req, res) => {
    const venue = req.body.venue;
    Performers.find({}, (err, entries) => {
        res.render('Reviews.ejs', {performers: entries, req: req, venue: venue});
    });
});
app.get('/create', (req, res) => {
    res.render('Create.ejs');
});

app.post('/create', async (req, res) => {
    const performers = new Performers({
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




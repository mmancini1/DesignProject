const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const moment = require('moment');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const salt = 10;
const BeerModel = require('./models/beerModel')
const UserModel = require('./models/UserModel')
const schedule = require('node-schedule');
const dotenv = require('dotenv');

dotenv.config();

const db = mongo.connect("mongodb://localhost:27017/designProject", function(err, response) {
    if (err) { console.log(err); } else { console.log('Connected to DB'); }
});

const app = express()
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//verify user
app.post("/api/login", function(req, res) {
    UserModel.findOne({ email: req.body.email }, function(err, result) {
        bcrypt.compare(req.body.pass, result.pass, (err, match) => {
            if (err) {
                throw err
            } else if (!match) {
                res.send({ login: false });
            } else {
                res.send({ login: true, name: result.name, email: result.email });
            }
        });
    });
});

//saves user info to db
app.post("/api/SignUp", function(req, res) {
    bcrypt.hash(req.body.pass, salt, (err, hash) => {
        req.body.pass = hash;
        const usr = new UserModel(req.body);
        //need to check if email exists
        usr.save(function(err, data) {
            if (err) {
                res.send(err);
            } else {
                console.log(data);
                res.send(data);
            }
        });
    });
});


//get notifications
app.post("/api/getNotifications", function(req, res) {
    const projection = { email: 1 };
    UserModel.find({ email: req.body.email }, { email: 1, notifications: 1 }, function(err, result) {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    });
});

// delete notifications
app.post("/api/deleteNotification", function(req, res) {
    UserModel.updateOne({ email: req.body.email }, { $pull: { notifications: { brewery: req.body.brewery, style: req.body.style, name: req.body.name } } }, function(err, result) {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    });
});

// add notifications
app.post("/api/addNotification", function(req, res) {

    UserModel.updateOne({ email: req.body.email }, { '$push': { notifications: { brewery: req.body.brewery, style: req.body.style, name: req.body.name } } }, function(err, result) {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    });
});


//retrieve beer
app.get("/api/getBeer", function(req, res) {
    BeerModel.find(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send({ result });
        }
    });
});


function sendEmail(recipient, emailBody) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.emailUser,
            pass: process.env.emailPass,
        }
    });

    var mailOptions = {
        from: process.env.emailFrom,
        // to: recipient,
        to: 'footballmaniac0788@yahoo.com',
        subject: "We've Got New Beer For You!",
        text: emailBody,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


function prepEmail() {
    const d = moment().format('MM/DD/YY');
    const yesterday = moment().subtract(1, 'days').format('MM/DD/YY');
    newBeer = [];

    BeerModel.find({ date: d }, function(err, beers) {
        if (err) {
            throw err;
        } else {
            if (beers.length > 0) {
                for (item in beers) {
                    t = beers[item].previousDate;
                    if (t[t.length - 2] != yesterday) {
                        newBeer.push(beers[item]);
                    }
                }
                UserModel.find({ email: { $exists: true } }, { email: 1, notifications: 1 }, function(err, users) {
                    if (err) {
                        throw err;
                    } else {
                        //outer loop through users
                        for (let i = 0; i < users.length; i++) {
                            res = users[i].notifications;
                            let emailBody = '';
                            //inner loop through users notifications
                            if (res.length > 0) {
                                for (j = 0; j < res.length; j++) {
                                    n = newBeer.filter(x => x.brewery === res[j].brewery && x.name === res[j].name || x.brewery === res[j].brewery && x.style.includes(res[j].style));
                                    if (n.length > 0) {
                                        //add notification
                                        for (it = 0; it < n.length; it++) {
                                            emailBody += `${n[it].brewery} just released ${n[it].name}\n`;
                                        }
                                    }
                                }
                            }
                            sendEmail(users[i].email, emailBody);
                        }
                    }
                });
            }
        }
    });
}



const job = schedule.scheduleJob('30 16 * * *', function() {
    prepEmail();
});

app.listen(8080, function() {
    console.log('App listening on port 8080!')
})
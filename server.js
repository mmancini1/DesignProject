const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const moment = require('moment');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const BeerModel = require('./models/beerModel')
const UserModel = require('./models/UserModel')
const schedule = require('node-schedule');
const dotenv = require('dotenv');
const salt = 10;
const app = express()


dotenv.config();

const db = mongo.connect(process.env.mongoDbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, response) {
    if (err) { console.log(err); } else { console.log('Connected to DB'); }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.angularUrl);
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
    UserModel.findOne({ email: req.body.email }, function(err, result) {
        if (result) {
            res.send({ login: false });
        } else {
            bcrypt.hash(req.body.pass, salt, (err, hash) => {
                req.body.pass = hash;
                const usr = new UserModel(req.body);
                usr.save(function(err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({ login: true });
                    }
                });
            });
        }

    });
});


//get user details
app.post("/api/getUserDetails", function(req, res) {
    UserModel.find({ email: req.body.email }, { email: 1, name: 1, addr: 1, city: 1, state: 1, zip: 1 }, function(err, result) {
        if (err) {
            throw err
        } else {
            console.log(result);
            res.send(result);
        }
    });
});


//get notifications
app.post("/api/getNotifications", function(req, res) {
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
    UserModel.find({ email: req.body.email, notifications: { brewery: req.body.brewery, style: req.body.style, name: req.body.name } }, function(err, result) {
        if (err) {
            throw err
        } else {
            if (result.length == 0) {
                UserModel.updateOne({ email: req.body.email }, { '$push': { notifications: { brewery: req.body.brewery, style: req.body.style, name: req.body.name } } }, function(err, r) {
                    if (err) {
                        throw err
                    } else {
                        res.send(r);
                    }
                });
            }
        }
    });
});


//retrieve beer
app.get("/api/getBeer", function(req, res) {
    BeerModel.find(function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve beer
app.get("/api/getCurrentBeer", function(req, res) {
    const d = moment().format('MM/DD/YY');
    BeerModel.find({ date: d }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


//retrieve breweries only
app.get("/api/getBreweries", function(req, res) {
    BeerModel.distinct("brewery", function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//retrieve styles only
app.get("/api/getStyles", function(req, res) {
    BeerModel.distinct("style", function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});


//get beers by brewery
app.post("/api/getSelectedBeers", function(req, res) {
    BeerModel.distinct("name", { brewery: req.body.brewery }, function(err, result) {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    });
});


function sendEmail(recipient, emailBody) {
    var transporter = nodemailer.createTransport({
        service: process.env.emailService,
        auth: {
            user: process.env.emailUser,
            pass: process.env.emailPass,
        }
    });

    var mailOptions = {
        from: process.env.emailFrom,
        to: recipient,
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
                            if (emailBody) {
                                sendEmail(users[i].email, emailBody);
                            }

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

app.listen(process.env.port, function() {
    console.log('Listening')
})
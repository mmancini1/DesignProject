const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const moment = require('moment');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const salt = 10;


const db = mongo.connect("mongodb://localhost:27017/designProject", function(err, response) {
    if (err) { console.log(err); } else { console.log('Connected to ' + db, ' + ', response); }
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

const Schema = mongo.Schema;

const NotifySchema = new Schema({
    email: { type: String },
    notifications: { type: Array },
});

const beerSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    abv: { type: String },
    ibu: { type: String },
    rating: { type: String },
    description: { type: String },
    brewery: { type: String },
    date: { type: String },
    previousDate: { type: Array },
}, { versionKey: false });

const SignUpSchema = new Schema({
    name: { type: String },
    email: { type: String },
    addr: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    pass: { type: String },
    notifications: { type: Array },
}, { versionKey: false });

//schema
const users = mongo.model('user', SignUpSchema, 'user');
const beers = mongo.model('beers', beerSchema, 'beers');
// const notifications = mongo.model('user', NotifySchema, 'user');


//saves user info to db
app.post("/api/SignUp", function(req, res) {
    bcrypt.hash(req.body.pass, salt, (err, hash) => {
        req.body.pass = hash;
        const usr = new users(req.body);
        //need to check if email exists
        usr.save(function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been Inserted..!!" });
            }
        });
    });
});


//notifications
app.post("/api/notifications", function(req, res) {
    const projection = { email: 1 };
    users.find({ email: req.body.email }, { email: 1, notifications: 1 }, function(err, result) {
        if (err) {
            throw err
        } else {
            res.send(result);
        }
    });
});


//verify user
app.post("/api/login", function(req, res) {
    users.findOne({ email: req.body.email }, function(err, result) {
        bcrypt.compare(req.body.pass, result.pass, (err, match) => {
            if (err) {
                throw err
            } else if (!match) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    });
});


//retrieve beer
app.get("/api/getBeer", function(req, res) {
    const d = moment().format('MM/DD/YY');
    beers.find({ date: d }, function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send({ result });
        }
    });
});




app.post("/api/SaveUser", function(req, res) {
    const mod = new model(req.body);
    if (req.body.mode == "Save") {
        mod.save(function(err, data) {
            if (err) {
                res.send(err);
            } else {
                res.send({ data: "Record has been Inserted..!!" });
            }
        });
    } else {
        model.findByIdAndUpdate(req.body.id, {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNo: req.body.phoneNo
            },
            function(err, data) {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ data: "Record has been Updated..!!" });
                }
            });


    }
})

app.post("/api/deleteUser", function(req, res) {
    model.remove({ _id: req.body.id }, function(err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: "Record has been Deleted..!!" });
        }
    });
})


app.get("/api/getUser", function(req, res) {
    model.find({}, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})


// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'beerfinder123@gmail.com',
//         pass: 'beerificationwebsite'
//     }
// });

// var mailOptions = {
//     from: 'BEERIFICATION <beerfinder123@gmail.com>',
//     to: 'footballmaniac0788@yahoo.com',
//     subject: "we've got beer for you!",
//     text: 'Sup Bro!\n\nCheck out this beer!'
// };

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });








app.listen(8080, function() {
    console.log('Example app listening on port 8080!')
})
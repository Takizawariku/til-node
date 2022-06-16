const LocalStrategy = require('passport-local').Strategy;
const app = require('express')
const bodyParser = require('body-parser');
passport.use(new LocalStrategy(function (username, password, done) {

}));
app.get('/login', function (req, res) {
    res.sendFile(__dirname + 'public/login.html');
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post('login.html',
    passport.authenticate('local'),
    function (req, res) {

    }
);
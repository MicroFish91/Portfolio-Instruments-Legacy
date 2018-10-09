var passport = require('passport');
var config = require('../config');
var db = require('../models');
var JwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var bcrypt = require('bcryptjs');
var LocalStrategy = require('passport-local');

const passportService = require('../config/passAuth');





// Points to database userName and userPassword columns
const localOptions = {
    usernameField: 'userName',
    passwordField: 'userPassword'
};

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (username, password, done) => {

    db.users.findAll({
        where: {
            userName: username
        }
    })
    .then(results => {
        
        if(results !== null){

            const user = results[0];

            bcrypt.compare(password, user.userPassword, (err, isMatch) => {

                // If error
                if (err){
                    return done(err);
                } 
                // If no match
                if(!isMatch){
                    return done(null, false);
                }
                // Match
                return done(null, user);
            }); 
        } 
    })
});


// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: extractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {

    db.users.findById(payload.sub)
    .then(foundUser => {
        
        if(foundUser) {
            done(null, foundUser);
        }
        else {
            done(null, false);
        }

    })
    .catch(error => {
        return done(error, false);
    })

});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
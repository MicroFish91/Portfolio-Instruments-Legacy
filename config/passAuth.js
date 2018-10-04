var passport = require('passport');
var config = require('../config');
var db = require('../models');
var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var bcrypt = require('bcryptjs');
var localStrategy = require('passport-local');

// Setup options for local strategy
const localOptions = {
    usernameField: 'email'
};

// Create local strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

    db.users.findAll({
        where: {
            userName: email
        }
    })
    .then(results => {
        
        if(results !== null){

            const user = results[0];

            bcrypt.compare((password, user.password, (err, isMatch)) => {

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
const jwtLogin = new jwtStrategy(jwtOptions, (payload, done) => {

    db.user.findById(payload.id)
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
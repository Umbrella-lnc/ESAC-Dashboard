const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const VerifiedUser = mongoose.model("verifiedUsers");
//const UnverifiedUser = mongoose.model("unverifiedUsers");

const dotenv = require('dotenv');

dotenv.config();
const secretOrKey = process.env.secretOrKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            VerifiedUser.findById(jwt_payload.id).then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
};
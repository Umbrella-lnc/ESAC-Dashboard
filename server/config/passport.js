import Jwt from 'passport-jwt';
import mongoose from 'mongoose';
import keys from '../config/keys';
import passport from 'passport';

const JwtStrategy = Jwt.Strategy;
const ExtractJwt = Jwt.ExtractJwt;
const User = mongoose.model("users")

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passports => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id).then(user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => console.log(err));
        })
    );
};
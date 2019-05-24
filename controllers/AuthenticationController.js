const boom = require('boom');
const passport = require('passport');
const User = require('../models/User');


exports.authenticate = (req, reply, next) => {
    passport.authenticate('local', { session: false }, (err, passportUser, info) => {

        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return reply.send(user.toAuthJSON());
        }

        reply.status(401);

        next();
    })(req, reply, next);
};

exports.tokenAuthentication = (req, reply, next) => {
    passport.authenticate('jwt', { session: false }, (err, passportUser, info) => {

        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = new User(passportUser);
            user.token = user.generateJWT();

            return reply.send(user.toAuthJSON());
        }

        reply.status(401);

        next();
    })(req, reply, next);

};


exports.login = (req, reply) => {
    try {
        reply.send();
    } catch (err) {
        throw boom.boomify(err);
    }
};



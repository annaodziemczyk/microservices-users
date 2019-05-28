const boom = require('boom');
const bcrypt = require('bcrypt');
const Joi = require('joi');
// Get Data Models
const User = require('../models/User');

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref('password')),
    roles: Joi.array().required()
});

// Add new user
exports.addUser = async (req, reply) => {
    try {

        let user = await Joi.validate(req.body, userSchema, { abortEarly: false });
        user.hashedPassword = bcrypt.hashSync(user.password, 10);
        delete user.password;
        return await new User(user).save();

    } catch (err) {
        throw boom.boomify(err);
    }
};

// Update an existing user
exports.updateUser = async (req, reply) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const { ...updateData } = user;
        const update = await Product.findByIdAndUpdate(id, updateData, { new: true });
        return update;
    } catch (err) {
        throw boom.boomify(err);
    }
};

// Delete a user
exports.deleteUser = async (req, reply) => {
    try {
        const id = req.params.id;
        const user = await Product.findByIdAndRemove(id);
        return user;
    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};

exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw boom.boomify(err);
        callback(null, isMatch);
    });
};




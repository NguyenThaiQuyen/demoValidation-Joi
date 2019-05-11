const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// get one user by id
exports.checkUserId = () => {
    return {
        params: {
            _id: Joi.objectId()
        }
    }
};

// create new user
exports.createUser = () => {
    return {
        body: {
            username: Joi.string().required(),
            password: Joi.string().min(3).required()
        }
    }
};

// update user
exports.updateUser = () => {
    return {
        body: {
            username: Joi.string(),
            password: Joi.string().min(3).required()
        },
        params: {
            _id: Joi.objectId()
        }
    }
};

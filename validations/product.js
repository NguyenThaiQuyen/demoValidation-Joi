const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

// get one product by id
exports.checkProductId = () => {
    return {
        params: {
            _id: Joi.objectId()
        }
    }
};

// create new  product
exports.createProduct = () => {
    return {
        body: {
            userId: Joi.objectId().required(),
            productname: Joi.string().required(),
            price: Joi.number().required(),
	        colors: Joi.array().items(Joi.string().required()),
	        isAvailable: Joi.boolean().truthy('Yes'),
	        payload: Joi.object({
		        expiredAt: Joi.date().min('1-1-1986').required(),
		        releasedAt: Joi.date().max('now').required()
	        }).required()
        }
    }
};

// update name product
exports.updateProduct = () => {
    return {
        body: {
            productname: Joi.string(),
        },
        params: {
            _id: Joi.objectId()
        }
    }
};

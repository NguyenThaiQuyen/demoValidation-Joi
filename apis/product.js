const userController = require('../controllers/product');
const userValidations = require('../validations/product');
const validate = require('express-validation');

exports.load = (app) => {
    app.get('/api/v1/products', userController.getListProduct); // get list product
	app.get('/api/v1/products/:id', validate(userValidations.checkProductId()), userController.getProduct); // get one product by id
	app.post('/api/v1/products', validate(userValidations.createProduct()), userController.createProduct); // create new product
	app.delete('/api/v1/products/:id', validate(userValidations.checkProductId()), userController.deleteProduct); // delete one product by id
	app.put('/api/v1/products/:id', validate(userValidations.updateProduct()), userController.updateProduct); // update one product by id, change name
}

/*
_id: Object(id),
	name: string,
	userId: Object(id), => get from user
	price: number,
	colors: StringArray ['red', 'yellow'],
	isAvailable: boolean,
	payload: {
		expiredAt: Date,
		releasedAt: Date
	}
 */
const userController = require('../controllers/user');
const userValidations = require('../validations/user');
const validate = require('express-validation');

exports.load = (app) => {
    app.get('/api/v1/users', userController.getListUser); // get list user
	app.get('/api/v1/users/:id', validate(userValidations.checkUserId()), userController.getUser); // get one user by id
	app.post('/api/v1/users', validate(userValidations.createUser()), userController.createUser); // create new user
	app.delete('/api/v1/users/:id', validate(userValidations.checkUserId()), userController.deleteUser); // delete one user by id
	app.put('/api/v1/users/:id', validate(userValidations.updateUser()), userController.updateUser); // update one user by id
}
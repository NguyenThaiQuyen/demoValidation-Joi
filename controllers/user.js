const { ObjectId } = require('mongodb');

// get one user
getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userCollection = req.db.collection('users');
        const userFind = await userCollection.findOne({
            _id: ObjectId(userId)
        });

        if (!userFind) {
            return next(new Error('USER_NOT_FOUND'));
        }

        return res.json({
            message: 'Infor user',
            data: userFind
        });
    } catch(err) {
        return next(err);
    }
};

// get list user
getListUser = async (req, res, next) => {
    try {
        const userCollection = req.db.collection('users');
        const users = await userCollection.find().toArray();

        if (!users) {
            return next(new Error('LIST_EMPTY'));
        }

        return res.json({
            message: 'List user',
            data: users
        });
    } catch(err) {
        return next(err);
    }
}
// create user
createUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const userCollection = req.db.collection('users');

        const userFind = await userCollection.findOne({
            username: username
        });

        if (userFind) {
            return next(new Error('USERNAME_EXISTED'));
        };

        const newUser = await userCollection.insertOne({
            username: username,
            password: password
        });
        
        return res.json({
            message: 'Create new user successfully!',
            data: newUser.ops[0]
        });
    } catch(err) {
        return next(err);
    }
}
// delete user
deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const userCollection = req.db.collection('users');
        const userDelete = await userCollection.findOneAndDelete({
            _id: ObjectId(userId)
        });

        if (userDelete.value === null) {
            return next(new Error('USER_NOT_FOUND'));
        };
        
        return res.json({
            message: 'Delete user successfully!',
            data: userDelete.value
        });
    } catch(err) {
        return next(err);
    }
}

// update user

updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        let { username, password } = req.body;
        const userCollection = req.db.collection('users');
        
        const userFindId = await userCollection.findOne({
            _id: ObjectId(userId)
        });

        if (!userFindId) {
            return next(new Error('USER_NOT_FOUND'));
        }

        username = username || userFind.username;
        password = password || userFind.password;

        const userFindName = await userCollection.findOne({
            username: username
        });

        if (userFindName) {
            return next(new Error('USERNAME_EXISTED'));
        };

        const userUpdate = await userCollection.updateOne({
            _id: ObjectId(userId)
        }, { $set : { 
            username: username,
            password: password 
            } 
        });

        return res.json({
            message: 'Update successfully!'
        });
    } catch(err) {
        return next(err);
    }
}

module.exports = {
    getUser: getUser,
    getListUser: getListUser,
    createUser : createUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};
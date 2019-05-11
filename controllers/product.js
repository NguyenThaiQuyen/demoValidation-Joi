const { ObjectId } = require('mongodb');

// get one product by id
getProduct = async (req, res, next) => {
    try {
        const userCollection = req.db.collection('users');
        const productCollection = req.db.collection('products');
        const productId = req.params.id;
        const productFind = await productCollection.findOne({
            _id: ObjectId(productId)
        });

        if (!productFind) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }

        const userId = productFind.userId;

        const userFind = await userCollection.findOne({
            _id: ObjectId(userId)
        });

        const productsDisplay = {...productFind};
        productsDisplay.userId = userFind;

        return res.json({
            message: 'Infor product',
            data: productsDisplay
        });
    } catch(err) {
        return next(err);
    }
};

// get list user
getListProduct= async (req, res, next) => {
    try {
        const productCollection = req.db.collection('products');
        const userCollection = req.db.collection('users');
        const dataProduct = await productCollection.find().toArray();
        const dataUser = await userCollection.find().toArray();

        
        const listProduct = [...dataProduct];
        const listUser = [...dataUser];
        let storedUser = [];
        let resultProduct = listProduct.map( itemProduct => {
            const copyProduct = {...itemProduct};
            if (!(storedUser[copyProduct.userId])) {
                // change property "userId" for product
                copyProduct.userId = listUser.find( itemUser => {
                    if (JSON.stringify(itemUser._id) === JSON.stringify(copyProduct.userId)) {
                        storedUser[itemUser._id] = itemUser;
                        return JSON.stringify(itemUser._id) === JSON.stringify(copyProduct.userId);
                    };
                });
            } else { // if users is existed
                copyProduct.userId = storedUser[copyProduct.userId];
            }
            return copyProduct;
        });

        return res.json({
            message: 'List product with user',
            data: resultProduct
        });
    } catch(err) {
        return next(err);
    }
}

// create user
createProduct = async (req, res, next) => {
    try {
        const body = req.body;
        const userId = body.userId;
        const userCollection = req.db.collection('users');
        const productCollection = req.db.collection('products');
        const existedUser = await userCollection.findOne({
            _id: ObjectId(userId)
        });

        if (!existedUser) {
            return next(new Error('USER_NOT_FOUND'));
        };

        const newProduct = await productCollection.insertOne(body);
        
        return res.json({
            message: 'Create new user successfully!',
            data: newProduct.ops[0]
        });
    } catch(err) {
        return next(err);
    }
}


// delete product by id
deleteProduct = async (req, res, next) => {
    try {
        const productCollection = req.db.collection('products');
        const productId = req.params.id;
        const productDelete = await productCollection.findOneAndDelete({
            _id: ObjectId(productId)
        });

        if (productDelete.value === null) {
            return next(new Error('NOT_FOUND'));
        };
        
        return res.json({
            message: 'Delete product successfully!',
            data: productDelete.value
        });
    } catch(err) {
        return next(err);
    }
}

// update product, change name

updateProduct = async (req, res, next) => {
    try {
        const productCollection = req.db.collection('products');
        const productId = req.params.id;
        let productName = req.body.productname;
        
        const productFindId = await productCollection.findOne({
            _id: ObjectId(productId)
        });

        if (!productFindId) {
            return next(new Error('NOT_FOUND'));
        }

        productName = productName || productFindId.productname;

        const productUpdate = await productCollection.updateOne({
            _id: ObjectId(productId)
        }, { $set : { 
            productname: productName
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
    getProduct: getProduct,
    getListProduct: getListProduct,
    createProduct : createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct
};
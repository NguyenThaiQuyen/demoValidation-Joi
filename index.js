const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const userRoute = require('./apis/user');
const productRoute = require('./apis/product');

const port = 3000;
const url = 'mongodb://localhost:27017';
const dbName = 'demoMongo';

app.use(bodyParser.json({ type: 'application/json' }));

// connect server

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        next(err);
        process.exit(1);
    };

    console.log("Connected successfully to server");
    const db = client.db(dbName);

    app.use((req, res, next) => {
        req.db = db;
        return next();
    });

    userRoute.load(app);
    productRoute.load(app);

    app.use((err, req, res, next) => {
        if (Array.isArray(err.errors)) {
            const messages = err.errors.map(item => {
                return item.messages;
            });

            return res.status(400).json({
                errors: messages
            });
        }
        return res.status(400).json({
            messages: err.message
        });
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    })

})
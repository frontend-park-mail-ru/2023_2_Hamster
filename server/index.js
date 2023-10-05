'use strict';

const express = require('express');
const path = require('path');

const app = express();

const routes = ['/login', '/registration', '/dashboard', '/']

routes.forEach((route) => {
    app.use(route, express.static(path.resolve(__dirname, '../src')));
    app.use(route, express.static(path.resolve(__dirname, '../node_modules')));
});

const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log(`Server listening port ${port}`);
});
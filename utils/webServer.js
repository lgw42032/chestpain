/**
 * Created by dell on 2017/10/5.
 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const path = require('path');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
var routers = require('../routers/index.js');
app.use('/', routers);
//app.use(routers);
exports.startWebServer = function(){
    app.listen(8010,()=>{
        console.log('running...');
    });
};
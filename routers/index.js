/**
 * Created by dell on 2018/1/4.
 */
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Json = bodyParser.json();
var config = require('../config/config.json');
router.get('/getConfig', function (req, res, next) {
   res.json(config);
});
module.exports = router;
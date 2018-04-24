/**
 * Created by dell on 2018/1/4.
 */
var express = require('express');
var router = express.Router();
var tools = require('../utils/tools');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Json = bodyParser.json();
var config = require('../config/config.json');
router.get('/getConfig', function (req, res, next) {
   res.json(config);
});
router.get('/getCaseByTaskCode', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getCaseByTaskCode",
         data:param
      });
      console.log("requestRes",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getCaseByTaskCode error")
      }
      else{
         var results = requestRes.data;

         res.json(results);
         tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getCaseByTaskCode: "+err)
   });
});


router.post('/patientCaseInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/patientCaseInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"patientCaseInfo error")
      }
      else{
         return func.echoSuccess(res, "success", 1);
      }
   }).catch(function(err){
      tools.echoError(res,"patientCaseInfo:" +err)
   });
});
module.exports = router;
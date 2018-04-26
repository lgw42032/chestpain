/**
 * Created by dell on 2018/1/4.
 */
var express = require('express');
var router = express.Router();
var co = require('co');
var tools = require('../utils/tools');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Json = bodyParser.json();
var config = require('../config/config.json');
var func = require('../utils/functor');
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
         let results = requestRes;
         res.json(results);
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
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"patientCaseInfo:" +err)
   });
});

router.get('/getChestPainInfo', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getChestPainInfo",
         data:param
      });
      console.log("requestRes",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getChestPainInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"getChestPainInfo: "+err)
   });
});

router.get('/getIllTeller', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getIllTeller",
         data:param
      });
      console.log("requestRes",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getIllTeller error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getIllTeller: "+err)
   });
});

router.get('/getHandOver', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getHandOver",
         data:param
      });
      console.log("getHandOver",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getHandOver error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getHandOver: "+err)
   });
});

router.get('/getTaskByID', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getTaskByID",
         data:param
      });
      console.log("getTaskByID",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getTaskByID error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getTaskByID: "+err)
   });
});

router.get('/getTaskDetailByID', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getTaskDetailByID",
         data:param
      });
      console.log("getTaskDetailByID",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getTaskDetailByID error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getTaskDetailByID: "+err)
   });
});

router.get('/getDAge', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDAge",
         data:param
      });
      console.log("getDAge",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDAge error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDAge: "+err)
   });
});

router.get('/getDFolk', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDFolk",
         data:param
      });
      console.log("getDFolk",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDFolk error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDFolk: "+err)
   });
});

router.get('/getDInDepartment', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDInDepartment",
         data:param
      });
      console.log("getDInDepartment",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDInDepartment error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDInDepartment: "+err)
   });
});

router.get('/getDDepartment', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDDepartment",
         data:param
      });
      console.log("getDDepartment",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDDepartment error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDDepartment: "+err)
   });
});

router.get('/getDLinkman', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDLinkman",
         data:param
      });
      console.log("getDDepartment",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDLinkman error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDLinkman: "+err)
   });
});

router.get('/getDOutComes', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDOutComes",
         data:param
      });
      console.log("getDOutComes",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDOutComes error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDOutComes: "+err)
   });
});

router.get('/getDDiseaseReason', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDDiseaseReason",
         data:param
      });
      console.log("getDDiseaseReason",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDDiseaseReason error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDDiseaseReason: "+err)
   });
});

router.get('/getDILLState', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDILLState",
         data:param
      });
      console.log("getDILLState",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDILLState error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDILLState: "+err)
   });
});

router.get('/getDCureResult', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDCureResult",
         data:param
      });
      console.log("getDCureResult",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDCureResult error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDCureResult: "+err)
   });
});

router.get('/getDDiseaseClass', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDDiseaseClass",
         data:param
      });
      console.log("getDDiseaseClass",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDDiseaseClass error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDDiseaseClass: "+err)
   });
});

router.get('/getStations', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getStations",
         data:param
      });
      console.log("getStations",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getStations error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getStations: "+err)
   });
});

router.get('/getPersonsByPersonType', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getPersonsByPersonType",
         data:param
      });
      console.log("getPersonsByPersonType",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getPersonsByPersonType error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getPersonsByPersonType: "+err)
   });
});

router.get('/getDPmhq', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDPmhq",
         data:param
      });
      console.log("getDPmhq",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDPmhq error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDPmhq: "+err)
   });
});

router.get('/getDAllergyq', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDAllergyq",
         data:param
      });
      console.log("getDAllergyq",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDAllergyq error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDAllergyq: "+err)
   });
});

router.get('/getDPhysicalExaminationq', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDPhysicalExaminationq",
         data:param
      });
      console.log("getDPhysicalExaminationq",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDPhysicalExaminationq error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDPhysicalExaminationq: "+err)
   });
});

router.get('/getDPosition', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDPosition",
         data:param
      });
      console.log("getDPosition",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDPosition error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDPosition: "+err)
   });
});

router.get('/getDMind', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDMind",
         data:param
      });
      console.log("getDMind",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDMind error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDMind: "+err)
   });
});

router.get('/getDSkin', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDSkin",
         data:param
      });
      console.log("getDSkin",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDSkin error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDSkin: "+err)
   });
});

router.get('/getDCyanosis', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDCyanosis",
         data:param
      });
      console.log("getDCyanosis",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDCyanosis error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDCyanosis: "+err)
   });
});

router.get('/getDLightReflex', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDLightReflex",
         data:param
      });
      console.log("getDLightReflex",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDLightReflex error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDLightReflex: "+err)
   });
});

router.get('/getDAccessoryExaminationq', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDAccessoryExaminationq",
         data:param
      });
      console.log("getDAccessoryExaminationq",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDAccessoryExaminationq error")
      }
      else{
         let results= requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDAccessoryExaminationq: "+err)
   });
});

router.get('/getDCureMeasure', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDCureMeasure",
         data:param
      });
      console.log("getDCureMeasure",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDCureMeasure error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDCureMeasure: "+err)
   });
});

router.get('/getDMedicine', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDMedicine",
         data:param
      });
      console.log("getDCureMeasure",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDMedicine error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDMedicine: "+err)
   });
});

router.get('/getDJust', function (req, res, next) {
   var param = req.query;
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"get",
         url:"/api/case/getDJust",
         data:param
      });
      console.log("getDJust",requestRes)
      if(!requestRes.success){
         return  tools.echoError(res,"getDJust error")
      }
      else{
         let results = requestRes;

         res.json(results);
         //tools.echoSuccess(res,"success");
      }
   }).catch(function(err){
      tools.echoError(res,"getDJust: "+err)
   });
});

router.post('/addPatientCaseBaseInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addPatientCaseBaseInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addPatientCaseBaseInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addPatientCaseBaseInfo:" +err)
   });
});
router.post('/editPatientCaseBaseInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editPatientCaseBaseInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editPatientCaseBaseInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editPatientCaseBaseInfo:" +err)
   });
});
router.post('/addPhysicalExamination', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addPhysicalExamination",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addPhysicalExamination error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addPhysicalExamination:" +err)
   });
});
router.post('/editPhysicalExamination', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editPhysicalExamination",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editPhysicalExamination error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editPhysicalExamination:" +err)
   });
});
router.post('/addAccessoryExamination', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addAccessoryExamination",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addAccessoryExamination error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addAccessoryExamination:" +err)
   });
});
router.post('/editAccessoryExamination', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editAccessoryExamination",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editAccessoryExamination error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editAccessoryExamination:" +err)
   });
});
router.post('/addMeasuresInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addMeasuresInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addMeasuresInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addMeasuresInfo:" +err)
   });
});
router.post('/editMeasuresInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editMeasuresInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editMeasuresInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editMeasuresInfo:" +err)
   });
});
router.post('/addChestPainInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addChestPainInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addChestPainInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addChestPainInfo:" +err)
   });
});
router.post('/addAllChestPainInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addAllChestPainInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addAllChestPainInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addAllChestPainInfo:" +err)
   });
});
router.post('/editChestPainInfo', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editChestPainInfo",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editChestPainInfo error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editChestPainInfo:" +err)
   });
});
router.post('/addIllteller', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addIllteller",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addIllteller error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addIllteller:" +err)
   });
});
router.post('/editIllteller', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editIllteller",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editIllteller error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editIllteller:" +err)
   });
});
router.post('/addHandoverRecord', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/addHandoverRecord",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"addHandoverRecord error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"addHandoverRecord:" +err)
   });
});
router.post('/editHandoverRecord', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/editHandoverRecord",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"editHandoverRecord error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"editHandoverRecord:" +err)
   });
});
router.post('/deletePatientCase', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/deletePatientCase",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"deletePatientCase error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"deletePatientCase:" +err)
   });
});
router.post('/saveAlterRecord', function (req, res, next) {
   co(function* () {
      var requestRes = yield tools.requestCenterApi({
         method:"post",
         url:"/api/case/saveAlterRecord",
         data:req.body
      });
      if(!requestRes.success){
         return  tools.echoError(res,"saveAlterRecord error")
      }
      else{
         let results = requestRes;
         res.json(results);
      }
   }).catch(function(err){
      tools.echoError(res,"saveAlterRecord:" +err)
   });
});
module.exports = router;
/**
 * Created by dell on 2018/1/4.
 */
define(function(require, exports, module) {
    exports.run = async function() {
        var promise = require('./promise');
        var util = require('./cxwUtil');
        var func = require('./func');
        require('amazeui');
        require('./libs/resLoader.js');
        var page = func.getUrlParam('page');
        var Task_code_c = func.getUrlParam('Task_code_c');
        var orderNo= func.getUrlParam('orderNo');
        var Amb_code_c= func.getUrlParam('Ambulance_code_c');
        var Name_c= func.getUrlParam('Name_c');
        var Station_code_c= func.getUrlParam('Station_code_c');
        var caseCount= func.getUrlParam('caseCount');
        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        console.log(page);
        var url = config.centerApiHost + ':' + config.centerApiPort;
        $('.load5').css('height',$(window).height())
        localStorage.setItem('page',page);

        var ChestpainCaseArr =  await promise.getChestpainCase(url,{
            taskCode:Task_code_c,
            orderNo: orderNo
        });
        console.log('ChestpainCase',ChestpainCaseArr);
        if(ChestpainCaseArr.data.length>0){
            let ChestpainCase = ChestpainCaseArr.data[0];
            let  ChestpainCaseStr = JSON.stringify(ChestpainCase);
            localStorage.setItem('ChestpainCaseStr',ChestpainCaseStr);
            localStorage.setItem('addChestpainCaseFlag',1);
        }else{
            localStorage.removeItem('ChestpainCaseStr');
            localStorage.setItem('addChestpainCaseFlag',0);
        }
        //var ChestpainCaseStr = JSON.stringify(ChestpainCase.data[0]);
        if(page=="view" || page=="edit"){
            if(page=='view'){
                $('.patient-name').html( "查看病历--"+ Name_c )
            }else{
                $('.patient-name').html( "编辑病历--"+ Name_c )
            }
            localStorage.removeItem('Case_number_c');
            localStorage.removeItem('orderNo');
            let PatientCase = await promise.getPatientCase(url,{
                Task_code_c:Task_code_c,
                orderNo: orderNo,
                station_code:Station_code_c
            });
            console.log('PatientCase',PatientCase);
            let PatientCaseStr =  JSON.stringify(PatientCase.data[0]);
            localStorage.setItem('PatientCaseStr',PatientCaseStr);
            localStorage.setItem('addPhysicalExaminationFlag',PatientCase.data[0].addPhysicalFlag);
            localStorage.setItem('addAuxiliaryExaminationFlag',PatientCase.data[0].addAccessoryFlag);
            localStorage.setItem('addRescueMeasuresFlag',PatientCase.data[0].addMeasuresFlag);
            localStorage.setItem('addIlltellerFlag',PatientCase.data[0].addIlltellerFlag);
            localStorage.setItem('addHandoverRecord',PatientCase.data[0].addHandoverFlag);
            let baseInfo = {
                sex:  PatientCase.data[0].Sex_c,
                age : PatientCase.data[0].Age_c,
                name : PatientCase.data[0].Name_c,
                illState_i : PatientCase.data[0].Ill_state_i,
                illState_c:PatientCase.data[0].Ill_state_c,
                Send_hos_i:PatientCase.data[0].Send_hos_i,
                Send_hos_c:PatientCase.data[0].Send_hos_c,
            };
            let baseInfoStr = JSON.stringify(baseInfo)
            localStorage.setItem('baseInfoStr',baseInfoStr);
            let Illteller =  await promise.getIllTeller(url,{
                Task_code_c:Task_code_c,
                orderNo: orderNo
            });
            console.log('Illteller',Illteller);
            let IlltellerStr = JSON.stringify(Illteller.data);
            localStorage.setItem('IlltellerStr',IlltellerStr);
            let HandOver =  await promise.getHandOver(url,{
                Task_code_c:Task_code_c,
                orderNo: orderNo
            });
            console.log('HandOver',HandOver);
            let HandOverStr = JSON.stringify(HandOver.data[0]);
            localStorage.setItem('HandOverStr',HandOverStr);
            $('.case-base').click(function(){
                window.location.href="caseBase.html?Name_c=" + Name_c +"&type=基础信息&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            $('.physical-examination').click(function(){
                window.location.href="physicalExamination.html?Name_c=" + Name_c +"&type=体格检查&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            $('.auxiliary-examination').click(function(){
                window.location.href="auxiliaryExamination.html?Name_c=" + Name_c +"&type=辅助检查&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            $('.rescue-measures').click(function(){
                window.location.href="rescueMeasures.html?Name_c=" + Name_c +"&type=施救措施&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            $('.chestpain-case').click(function(){
                window.location.href="chestpainCase.html?Name_c=" + Name_c +"&type=胸痛病历&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            $('.disease-informing').click(function(){
                window.location.href="diseaseInforming.html?Name_c=" + Name_c +"&type=病情告知&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            $('.handover-record').click(function(){
                window.location.href="handoverRecord.html?Name_c=" + Name_c +"&type=交接记录&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page;
            });
            //$('.case-base').attr('href',"caseBase.html?Name_c=" + Name_c +"&type=基础信息&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page);
            //$('.physical-examination').attr('href',"physicalExamination.html?Name_c=" + Name_c +"&type=体格检查&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page);
            //$('.auxiliary-examination').attr('href',"auxiliaryExamination.html?Name_c=" + Name_c +"&type=辅助检查&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page);
            //$('.rescue-measures').attr('href',"rescueMeasures.html?Name_c=" + Name_c +"&type=施救措施&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page);
            //$('.chestpain-case').attr('href',"chestpainCase.html?Name_c=" + Name_c +"&type=胸痛病历&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page);
            //$('.disease-informing').attr('href',"diseaseInforming.html?Name_c="+ Name_c +"&type=病情告知&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page);
            //$('.handover-record').attr('href',"handoverRecord.html?Name_c=" + Name_c +"&type=交接记录&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page );
        }else if(page=="add"){
            $('.patient-name').html( "增加病历")
            if(localStorage.getItem('addBaseInfoFlag')!='1'){
                localStorage.removeItem('PatientCaseStr');
                localStorage.removeItem('IlltellerStr');
                localStorage.removeItem('HandOverStr');
            }else{
                orderNo = localStorage.getItem('orderNo');
                let PatientCase = await promise.getPatientCase(url,{
                    Task_code_c:Task_code_c,
                    orderNo: orderNo,
                    station_code:Station_code_c
                });
                console.log('PatientCase',PatientCase);
                let PatientCaseStr =  JSON.stringify(PatientCase.data[0]);
                localStorage.setItem('PatientCaseStr',PatientCaseStr);
                localStorage.setItem('PatientCaseStr',PatientCaseStr);
                localStorage.setItem('addPhysicalExaminationFlag',PatientCase.data[0].addPhysicalFlag);
                localStorage.setItem('addAuxiliaryExaminationFlag',PatientCase.data[0].addAccessoryFlag);
                localStorage.setItem('addRescueMeasuresFlag',PatientCase.data[0].addMeasuresFlag);
                localStorage.setItem('addIlltellerFlag',PatientCase.data[0].addIlltellerFlag);
                localStorage.setItem('addHandoverRecord',PatientCase.data[0].addHandoverFlag);
                let baseInfo = {
                    sex:  PatientCase.data[0].Sex_c,
                    age : PatientCase.data[0].Age_c,
                    name : PatientCase.data[0].Name_c,
                    illState_i : PatientCase.data[0].Ill_state_i,
                    illState_c:PatientCase.data[0].Ill_state_c,
                    Send_hos_i:PatientCase.data[0].Send_hos_i,
                    Send_hos_c:PatientCase.data[0].Send_hos_c,
                };
                let baseInfoStr = JSON.stringify(baseInfo)
                localStorage.setItem('baseInfoStr',baseInfoStr);
                let Illteller =  await promise.getIllTeller(url,{
                    Task_code_c:Task_code_c,
                    orderNo: orderNo
                });
                console.log('Illteller',Illteller);
                let IlltellerStr = JSON.stringify(Illteller.data);
                localStorage.setItem('IlltellerStr',IlltellerStr);
                let HandOver =  await promise.getHandOver(url,{
                    Task_code_c:Task_code_c,
                    orderNo: orderNo
                });
                console.log('HandOver',HandOver);
                let HandOverStr = JSON.stringify(HandOver.data[0]);
                localStorage.setItem('HandOverStr',HandOverStr);
            }


            $('.case-base').click(function(){
                window.location.href="caseBase.html?Name_c=" + Name_c +"&type=基础信息&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });
            $('.physical-examination').click(function(){
                window.location.href="physicalExamination.html?Name_c=" + Name_c +"&type=体格检查&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });
            $('.auxiliary-examination').click(function(){
                window.location.href="auxiliaryExamination.html?Name_c=" + Name_c +"&type=辅助检查&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });
            $('.rescue-measures').click(function(){
                window.location.href="rescueMeasures.html?Name_c=" + Name_c +"&type=施救措施&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });
            $('.chestpain-case').click(function(){
                window.location.href="chestpainCase.html?Name_c=" + Name_c +"&type=胸痛病历&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });
            $('.disease-informing').click(function(){
                window.location.href="diseaseInforming.html?Name_c=" + Name_c +"&type=病情告知&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });
            $('.handover-record').click(function(){
                window.location.href="handoverRecord.html?Name_c=" + Name_c +"&type=交接记录&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page + "&caseCount=" + caseCount;
            });

            //localStorage.removeItem('ChestpainCaseStr');
            //$('.case-base').attr('href',"caseBase.html?Name_c=" + Name_c +"&type=基础信息&Task_code_c="+ Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c + "&page=" + page+ "&caseCount=" + caseCount);
            //$('.physical-examination').attr('href',"physicalExamination.html?Name_c=" + Name_c +"&type=体格检查&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page + "&caseCount=" + caseCount);
            //$('.auxiliary-examination').attr('href',"auxiliaryExamination.html?Name_c=" + Name_c +"&type=辅助检查&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page + "&caseCount=" + caseCount);
            //$('.rescue-measures').attr('href',"rescueMeasures.html?Name_c=" + Name_c +"&type=施救措施&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page + "&caseCount=" + caseCount);
            //$('.chestpain-case').attr('href',"chestpainCase.html?Name_c=" + Name_c +"&type=胸痛病历&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page + "&caseCount=" + caseCount);
            //$('.disease-informing').attr('href',"diseaseInforming.html?Name_c="+ Name_c +"&type=病情告知&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page + "&caseCount=" + caseCount);
            //$('.handover-record').attr('href',"handoverRecord.html?Name_c=" + Name_c +"&type=交接记录&Task_code_c=" + Task_code_c + "&Amb_code_c=" + Amb_code_c+ "&orderNo=" + orderNo + "&Station_code_c=" + Station_code_c+ "&page=" + page + "&caseCount=" + caseCount );
        }
        $('.body-content').css('display','block');
        $('.load5').css('display','none');

        //检查storage剩余容量大小
        if(window.localStorage)
        {
            var size = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(localStorage))).length;
            console.log('当前localStorage剩余容量为:'+(size/1024).toFixed(2) + 'KB');
        }
    }
});

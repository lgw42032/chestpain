/**
 * Created by dell on 2018/1/6.
 */

define(function(require, exports, module) {
    exports.run =async function() {
        var promise = require('./promise');
        var util = require('./cxwUtil');
        var func = require('./func');
        require('amazeui');
        require('handlebars');
        require('widgets');

        var addBaseInfoFlag= localStorage.getItem('addBaseInfoFlag');
        console.log(addBaseInfoFlag);
        $('.load5').css('height',$(window).height());

        var patientName =func.getUrlParam('Name_c');
        var type = func.getUrlParam('type');
        var page =  func.getUrlParam('page');
        var Task_code_c =func.getUrlParam('Task_code_c');
        var Amb_code_c =func.getUrlParam('Amb_code_c');
        var orderNo =func.getUrlParam('orderNo');
        var Station_code_c =func.getUrlParam('Station_code_c');
        var caseCount =func.getUrlParam('caseCount');

        var PatientCaseStr='';
        var PatientCase={} ;
        if(!!localStorage.getItem('PatientCaseStr')&&localStorage.getItem('PatientCaseStr')!='undefined'){
            PatientCaseStr =localStorage.getItem('PatientCaseStr');
            console.log(PatientCaseStr)
            PatientCase = JSON.parse(PatientCaseStr);
        }

        switch(page){
            case 'view':
                $('.submit').css('display','none');
                $('.patient-name').html('查看病历--'+patientName+'--'+ type );
                break;
            case 'add':
                $('.patient-name').html('新增病历'+'--'+ type );
                if(addBaseInfoFlag=='0'){
                    func.alertWindowGobackTrue('辅助检查','请先填写基础信息');
                    //alert('请先填写基础信息');
                    //window.history.go(-1);
                }
                //if(localStorage.getItem('addAuxiliaryExaminationFlag')=='1'){
                //    func.alertWindowGoback('辅助检查','辅助检查已填写',true);
                //    //alert('辅助检查已填写');
                //    //window.history.go(-1);
                //}
                orderNo = localStorage.getItem('orderNo');
                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
        }
        //var IlltellerStr = localStorage.getItem('IlltellerStr');
        //var Illteller = JSON.parse(IlltellerStr);
        //var HandOverStr = localStorage.getItem('HandOverStr');
        //var HandOver = JSON.parse(HandOverStr);
        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        var userInfo = JSON.parse(localStorage.getItem('userInfoStr'))
        var url = config.centerApiHost + ':' + config.centerApiPort;
        var DAccessoryExaminationq = await promise.getDAccessoryExaminationq(url,{});
        func.deleteFirst(DAccessoryExaminationq.data);
        console.log(DAccessoryExaminationq);
        func.render($('#optionTemName'),$('select[name=Glucose_q_c]'),DAccessoryExaminationq);
        func.render($('#optionTemName'),$('select[name=Sop_q_c]'),DAccessoryExaminationq);
        func.render($('#optionTemName'),$('select[name=Ecg_c]'),DAccessoryExaminationq);

        $("li").each(function(i,v){func.cleanWhitespace(v)});
        for(let k in PatientCase){
            $('input[name='+ k +']').val(PatientCase[k]);
            $('textarea[name='+ k +']').val(PatientCase[k]);
            if(!!PatientCase[k]){
                $('select[name='+ k +']').find('option[text='+ PatientCase[k] +']').attr('selected', true);
                //$('select[name='+ k +']').find('option[value='+ PatientCase[k] +']').attr('selected', true);
                $('select[name='+ k +']').trigger('changed.selected.amui');
            }
        }
        $('.body-content').css('display','block');
        $('.load5').css('display','none');
        $('.submit button').click(async function(){
            $('.body-content').css('display','none');
            $('.load5').css('display','block');
            if(localStorage.getItem('addAuxiliaryExaminationFlag')!='1'){

                let data = $('#fma').serialize();
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.addAccessoryExamination(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    localStorage.setItem('addAuxiliaryExaminationFlag','1');
                    func.alertWindowGobackTrue('辅助检查','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('辅助检查','保存失败');
                    //alert('保存失败')
                }
            }else{
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                let data = $('#fma').serialize();

                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.editAccessoryExamination(url,data);
                let newdata = $("#fma").serializeObject();

                let params = {
                    Task_code_c:Task_code_c,
                    stacd:Station_code_c,
                    orderNo:orderNo,
                    caseNm:Case_number_c,
                    oldData:PatientCaseStr,
                    newData:JSON.stringify(newdata),
                    userName:userInfo.name
                };
                console.log(params);
                let save = await promise.saveAlterRecord(url,params);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success&&save.success){
                    func.alertWindowGobackTrue('辅助检查','保存成功');

                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('辅助检查','保存失败');
                    //alert('保存失败')
                }
            }
        })
    }
});





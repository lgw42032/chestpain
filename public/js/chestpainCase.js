/**
 * Created by dell on 2018/1/11.
 */
define(function(require, exports, module) {
    exports.run =async function() {
        var promise = require('./promise');
        var util = require('./cxwUtil');
        var func = require('./func');
        require('amazeui');
        require('datatimepicker').run();
        require('zh-cn').run();
        $('.load5').css('height',$(window).height())
        var addBaseInfoFlag= localStorage.getItem('addBaseInfoFlag');
        var patientName =func.getUrlParam('Name_c');
        var type = func.getUrlParam('type');
        var page =  func.getUrlParam('page');
        console.log(page);
        var Task_code_c =func.getUrlParam('Task_code_c');
        var Amb_code_c =func.getUrlParam('Amb_code_c');
        var orderNo =func.getUrlParam('orderNo');
        var Station_code_c =func.getUrlParam('Station_code_c');
        var caseCount =func.getUrlParam('caseCount');
        if(page=='add'&&addBaseInfoFlag==0){
            func.alertWindowGobackTrue('胸痛病历','请先填写基础信息');
            return;
        }
        var PatientCaseStr='';
        var PatientCase={} ;
        if(!!localStorage.getItem('PatientCaseStr')&&localStorage.getItem('PatientCaseStr')!='undefined'){
            PatientCaseStr =localStorage.getItem('PatientCaseStr');
            PatientCase = JSON.parse(PatientCaseStr);
            $('span[name=name]').html(PatientCase.Name_c);
            $('span[name=sex]').html(PatientCase.Sex_c);
            $('span[name=age]').html(PatientCase.Age_c);
        }
        var ChestpainCase={} ;
        var ChestpainCaseStr = '';
        if(!!localStorage.getItem('ChestpainCaseStr')&&(localStorage.getItem('ChestpainCaseStr')!='undefined')){
            ChestpainCaseStr =localStorage.getItem('ChestpainCaseStr');
            ChestpainCase = JSON.parse(ChestpainCaseStr);
        }

        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        var userInfoStr = localStorage.getItem('userInfoStr')
        var userInfo = JSON.parse(userInfoStr);
        var url = config.centerApiHost + ':' + config.centerApiPort;
        switch(page){
            case 'view':
                $('.submit').css('display','none');
                $('.patient-name').html('查看病历--'+patientName+'--'+ type );
                console.log('查看病历--'+ patientName+ '--'+ type );
                break;
            case 'add':
                $('.patient-name').html('新增病历'+'--'+ type );
                console.log('新增病历--'+ patientName+ '--'+ type );
                if(addBaseInfoFlag=='0'){
                    func.alertWindowGobackTrue('胸痛病历','请先填写基础信息');
                    return;
                    //alert('请先填写基础信息');
                    //window.history.go(-1);
                }
                var baseInfoStr = localStorage.getItem('baseInfoStr');
                var baseInfo  = JSON.parse(baseInfoStr);
                if(!!baseInfo){
                    $('span[name=name]').html(baseInfo.name);
                    $('span[name=sex]').html(baseInfo.sex);
                    $('span[name=age]').html(baseInfo.age);
                }



                //if(localStorage.getItem('addChestpainCaseFlag')=='1'){
                //    func.alertWindowGoback('胸痛病历','胸痛病历已填写',true);
                //    //alert('胸痛病历已填写');
                //    //window.history.go(-1);
                //}
                orderNo = localStorage.getItem('orderNo');
                //var chestpainTime = await promise.getChestpainTime(url,{

                //});
                //for(var k in chestpainTime){
                //    $('input[name='+ k +']').val(chestpainTime[k]);
                //}
                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
                console.log('编辑病历--'+ patientName+ '--'+ type );
                if(localStorage.getItem('baseInfoStr')&&(localStorage.getItem('baseInfoStr')!='undefined')){
                    var baseInfoStr =localStorage.getItem('baseInfoStr');
                    baseInfo = JSON.parse(baseInfoStr);
                    $('span[name=name]').html(baseInfo.name);
                    $('span[name=sex]').html(baseInfo.sex);
                    $('span[name=age]').html(baseInfo.age);

                }
        };
        var taskInfoArr = await promise.getTaskDetailByID(url,{
            Task_code_c:Task_code_c,
            Amb_code_c:Amb_code_c
        });
//$('input[name=preHospitalInspectionItems][value='8']')
        var taskInfo = taskInfoArr.data[0];

       $(function(){
           for(let k in taskInfo){
               $('span[name='+ k +']').html(taskInfo[k]);
           }
           for(let k in ChestpainCase){

               if(k=='preHospitalInspectionItems'||k=='preHosCheck'){
                   if(!!ChestpainCase[k]){
                       var arr = ChestpainCase[k].split(',');
                       arr.forEach(function(v,i){
                           $('input[name='+ k +'][value='+ v+']').prop('checked',true)
                       })

                   }
               }else{
                   $('input[name='+ k +']').val(ChestpainCase[k]);
                   $('textarea[name='+ k +']').html(ChestpainCase[k]);
               }
           }
       })

        $(function(){
            $('.form_datetime-1').datetimepicker({
                language:  'zh-CN',
                format: 'yyyy-mm-dd hh:ii',
                autoclose: true,
                todayBtn: true,
                todayHighlight: true,
                minuteStep: 1,
                theme: 'success'
            });
            $('.body-content').css('display','block');
            $('.load5').css('display','none');
        });
        $('.submit button').click(async function(){
            //if(!$('input[name=onsetTime]').val()){
            //    func.alertWindowGoback('胸痛病历','请输入发病时间',false);
            //    func.moveCenterScreen($('input[name=onsetTime]'))
            //    return;
            //}else if(!$('#callTime').html()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入呼叫120时间',false);
            //    func.moveCenterScreen($('#callTime'))
            //    return;
            //}else if(!$('#Arr_loc_time').html()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入到达现场时间',false);
            //    func.moveCenterScreen($('#Arr_loc_time'))
            //    return;
            //}else if(!$('input[name=preHosECGCheckTime]').val()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入院前心电图时间',false);
            //    func.moveCenterScreen($('input[name=preHosECGCheckTime]'));
            //    return;
            //}else if(!$('input[name=preHosECGDiagnosisTime]').val()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入院前心电图诊断时间',false);
            //    func.moveCenterScreen($('input[name=preHosECGDiagnosisTime]'))
            //    return;
            //}else if(!$('input[name=preHosStartCatheterTime]').val()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入院前启动导管室时间',false);
            //    func.moveCenterScreen($('input[name=preHosStartCatheterTime]'))
            //    return;
            //}else if(!$('#Arr_hos_time').html()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入到达医院时间',false);
            //    func.moveCenterScreen($('#Arr_hos_time'))
            //    return;
            //
            //}else if(!$('input[name= bloodTime]').val()){
            //    //alert('请输入疾病类型');
            //    func.alertWindowGoback('胸痛病历','请输入到达医院时间',false);
            //    func.moveCenterScreen($('input[name= bloodTime]'))
            //    return;
            //}

            if(localStorage.getItem('addChestpainCaseFlag')!='1'){
                $('.body-content').css('display','none');
                $('.load5').css('display','block');
                let data = $('#fmc').serialize();
                data = data +"&taskCode=" + Task_code_c + "&userName=" + userInfo.name ;
                let result = await promise.addChestpainCase(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    localStorage.setItem('addChestpainCaseFlag','1');
                    func.alertWindowGobackTrue('胸痛病历','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('胸痛病历','保存失败');
                    //alert('保存失败')
                }
            }else{

                let data = $('#fmc').serialize();
                data = data +"&taskCode=" + Task_code_c + "&userName=" + userInfo.name ;
                let result = await promise.editChestpainCase(url,data);

                let newdata = $("#fmc").serializeObject();
                let params = {
                    Task_code_c:Task_code_c,
                    stacd:Station_code_c,
                    orderNo:orderNo,
                    oldData:ChestpainCaseStr,
                    newData:JSON.stringify(newdata),
                    userName:userInfo.name
                };
                console.log(params);
                let save = await promise.saveAlterRecord(url,params);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success&&save.success){
                    localStorage.setItem('addChestpainCaseFlag','1');
                    func.alertWindowGobackTrue('胸痛病历','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('胸痛病历','保存失败');
                    //alert('保存失败')
                }
            }


        })

    }
});





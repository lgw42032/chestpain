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
        console.log(addBaseInfoFlag)
        $('.load5').css('height',$(window).height())

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
                    func.alertWindowGobackTrue('施救措施','请先填写基础信息');
                    //alert('请先填写基础信息');
                    //window.history.go(-1);
                }
                //if(localStorage.getItem('addRescueMeasuresFlag')=='1'){
                //    func.alertWindowGoback('施救措施','施救措施已填写',true);
                //    //alert('施救措施已填写');
                //    //window.history.go(-1);
                //}
                orderNo = localStorage.getItem('orderNo');
                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
        };
        //var IlltellerStr = localStorage.getItem('IlltellerStr');
        //var Illteller = JSON.parse(IlltellerStr);
        //var HandOverStr = localStorage.getItem('HandOverStr');
        //var HandOver = JSON.parse(HandOverStr);
        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        var userInfo = JSON.parse(localStorage.getItem('userInfoStr'));
        var url = config.centerApiHost + ':' + config.centerApiPort;
        var DCureMeasure = await promise.getDCureMeasure(url,{});
        func.addName(DCureMeasure.data);

        func.render($('#cureMeasureTem'),$('.cure-measure'),DCureMeasure);
        var DMedicine = await promise.getDMedicine(url,{});
        func.addName(DMedicine.data);

        func.render($('#medicineTem'),$('.medicine'),DMedicine);

        $("li").each(function(i,v){func.cleanWhitespace(v)});
        var taskInfoArr = await promise.getTaskByID(url,{
            Task_code_c:Task_code_c,
            Amb_code_c:Amb_code_c
        });
        var taskInfo = taskInfoArr.data[0];
        for(let k in taskInfo){
            $('input[name='+ k +']').val(taskInfo[k]);
            $('textarea[name='+ k +']').val(taskInfo[k]);
        };
        for(let k in PatientCase){
            $('input[name='+ k +']').val(PatientCase[k]);
            $('textarea[name='+ k +']').val(PatientCase[k]);
        };
        $('.chooseDCureMeasure').click(function(){
            var chooseDCureMeasureArr= [];
            $('.cure-measure li input:checkbox:checked').each(function(i,v){
                chooseDCureMeasureArr.push($(this).next('label').html());
            });
            var chooseDCureMeasureStr = chooseDCureMeasureArr.join('；');
            $('textarea[name=Measures_c]').val(chooseDCureMeasureStr);
        });
        $('.chooseMedicine').click(function(){
            var chooseMedicineArr= [];
            $('.medicine li input:checkbox:checked').each(function(i,v){
                chooseMedicineArr.push($(this).next('label').html());
            });
            var chooseMedicineStr = chooseMedicineArr.join('；');
            $('textarea[name=Medicines_c]').val(chooseMedicineStr);
        });
        $('.body-content').css('display','block');
        $('.load5').css('display','none');
        $('.submit button').click(async function(){
            $('.body-content').css('display','none');
            $('.load5').css('display','block');
            if(localStorage.getItem('addRescueMeasuresFlag')!='1'){
                let data = $('#fmm').serialize();
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.addMeasuresInfo(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    localStorage.setItem('addRescueMeasuresFlag','1');
                    func.alertWindowGobackTrue('施救措施','保存成功');

                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('施救措施','保存失败');

                    //alert('保存失败')
                }
            }else {
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                let data = $('#fmm').serialize();
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.editMeasuresInfo(url,data);
                let newdata = $("#fmm").serializeObject();

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
                    func.alertWindowGobackTrue('施救措施','保存成功');

                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('施救措施','保存失败');

                    //alert('保存失败')
                }
            }
        })
    }
});






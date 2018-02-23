/**
 * Created by dell on 2018/1/8.
 */
define(function(require, exports, module) {
    exports.run =async function() {
        var promise = require('./promise');
        var util = require('./cxwUtil');
        var func = require('./func');
        require('amazeui');
        require('handlebars');
        require('widgets');
        require('./libs/resLoader.js');
        require('datatimepicker').run();
        require('zh-cn').run();
        var addBaseInfoFlag= localStorage.getItem('addBaseInfoFlag');
        $('.load5').css('height',$(window).height());
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
        })
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


        var HandOver={} ;
        var HandOverStr='';
        if(localStorage.getItem('HandOverStr')&&(localStorage.getItem('HandOverStr')!='undefined')){
            HandOverStr=localStorage.getItem('HandOverStr');
            console.log(typeof HandOverStr)
            HandOver = JSON.parse(HandOverStr);
        }
        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        var userInfoStr = localStorage.getItem('userInfoStr')
        var userInfo = JSON.parse(userInfoStr);
        var url = config.centerApiHost + ':' + config.centerApiPort;
        var DCureMeasure = await promise.getDCureMeasure(url,{});
        func.addName(DCureMeasure.data);
        console.log(DCureMeasure);
        func.render($('#cureMeasureTem'),$('.cure-measure'),DCureMeasure);
        var DJust = await promise.getDJust(url,{});
        func.addName(DJust.data);
        func.render($('#dJustTem'),$('.DJust'),DJust);
        var DMind = await promise.getDMind(url,{});
        func.deleteFirst(DMind.data);
        console.log(DMind)
        func.render($('#optionTemName'),$('select[name=h_Mind_c]'),DMind);

        switch(page){
            case 'view':
                $('.submit').css('display','none');
                $('.patient-name').html('查看病历--'+patientName+'--'+ type );
                for(let k in PatientCase){
                    if(!!PatientCase[k]){
                        $('span[name='+ k +']').html(PatientCase[k]);
                    }
                }
                for(let k in HandOver){
                    $('input[name='+ k +']').val(HandOver[k]);
                    $('textarea[name='+ k +']').val(HandOver[k]);
                    if(!!HandOver[k]){
                        $('select[name='+ k +']').find('option[text='+ '' + HandOver[k] +']').attr('selected', true);
                        $('select[name='+ k +']').trigger('changed.selected.amui');
                    }
                }
                break;
            case 'add':
                $('.patient-name').html('新增病历'+'--'+ type );
                if(addBaseInfoFlag=='0'){
                    func.alertWindowGobackTrue('交接记录','请先填写基础信息');
                    //alert('请先填写基础信息');
                    //window.history.go(-1);
                }
                if( localStorage.getItem('addHandoverRecord')=='1'){
                    for(let k in PatientCase){
                        if(!!PatientCase[k]){
                            $('span[name='+ k +']').html(PatientCase[k]);
                        }
                    }
                    for(let k in HandOver){
                        $('input[name='+ k +']').val(HandOver[k]);
                        $('textarea[name='+ k +']').val(HandOver[k]);
                        if(!!HandOver[k]){
                            $('select[name='+ k +']').find('option[text='+ HandOver[k] +']').attr('selected', true);
                            $('select[name='+ k +']').trigger('changed.selected.amui');
                        }
                    }
                    var baseInfo  = {};
                    if(localStorage.getItem('baseInfoStr')&&(localStorage.getItem('baseInfoStr')!='undefined')){
                        var baseInfoStr =localStorage.getItem('baseInfoStr');
                        baseInfo = JSON.parse(baseInfoStr);
                        $('span[name=Name_c]').html(baseInfo.name);
                        $('span[name=Sex_c]').html(baseInfo.sex);
                        $('span[name=Age_c]').html(baseInfo.age);
                        if(baseInfo.illState_c!='点击选择...'){
                            $('span[name=IllState]').html(baseInfo.illState_c);
                        }
                        $('span[name=stationName]').html(userInfo.stationName);
                        $('span[name=Send_hos_c]').html(baseInfo.Send_hos_c);
                    }
                }
                orderNo = localStorage.getItem('orderNo');
                var baseInfoStr = localStorage.getItem('baseInfoStr');
                var baseInfo  = JSON.parse(baseInfoStr);
                $('span[name=Name_c]').html(baseInfo.name);
                $('span[name=Sex_c]').html(baseInfo.sex);
                $('span[name=Age_c]').html(baseInfo.age);
                if(baseInfo.illState!='点击选择...'){
                    $('span[name=IllState]').html(baseInfo.illState_c);
                }
                $('span[name=stationName]').html(userInfo.stationName);
                $('span[name=Send_hos_c]').html(baseInfo.Send_hos_c);
                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
                for(let k in PatientCase){
                    if(!!PatientCase[k]){
                        $('span[name='+ k +']').html(PatientCase[k]);
                    }
                }
                for(let k in HandOver){
                    $('input[name='+ k +']').val(HandOver[k]);
                    $('textarea[name='+ k +']').val(HandOver[k]);
                    if(!!HandOver[k]){
                        $('select[name='+ k +']').find('option[text='+ HandOver[k] +']').attr('selected', true);
                        $('select[name='+ k +']').trigger('changed.selected.amui');
                    }
                }
                var baseInfo  = {};
                if(localStorage.getItem('baseInfoStr')&&(localStorage.getItem('baseInfoStr')!='undefined')){
                    var baseInfoStr =localStorage.getItem('baseInfoStr');
                    baseInfo = JSON.parse(baseInfoStr);
                    $('span[name=Name_c]').html(baseInfo.name);
                    $('span[name=Sex_c]').html(baseInfo.sex);
                    $('span[name=Age_c]').html(baseInfo.age);
                    if(baseInfo.illState_c!='点击选择...'){
                        $('span[name=IllState]').html(baseInfo.illState_c);
                    }
                    $('span[name=stationName]').html(userInfo.stationName);
                    $('span[name=Send_hos_c]').html(baseInfo.Send_hos_c);
                }
        }

        $('.chooseDCureMeasure').click(function(){
            var chooseDCureMeasureArr= [];
            $('.cure-measure li input:checkbox:checked').each(function(i,v){
                chooseDCureMeasureArr.push($(this).next('label').html());
            });
            var chooseDCureMeasureStr = chooseDCureMeasureArr.join(';');
            console.log(chooseDCureMeasureStr);
            $('textarea[name=h_Measures_c]').val(chooseDCureMeasureStr);
        })
        $('.chooseDJust').click(function(){
            var chooseDJustArr= [];
            $('.DJust li input:checkbox:checked').each(function(i,v){
                chooseDJustArr.push($(this).next('label').html());
            });
            var chooseDJustStr = chooseDJustArr.join(';');
            console.log(chooseDJustStr);
            $('textarea[name=h_Diagnose_c]').val(chooseDJustStr);
        })
        //$('.body-content').css('display','block');
        //$('.load5').css('display','none');
        $('.submit button').click(async function(){
            if(!$('input[name=Handover_time]').val()){
                func.alertWindowGobackFalse('交接记录','请输入交接时间');
                //alert('请输入交接时间');
                return;
            }
            $('.body-content').css('display','none');
            $('.load5').css('display','block');
            if( localStorage.getItem('addHandoverRecord')!='1'){
                var data = $('#fmh').serialize();
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                var result = await promise.addHandoverRecord(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    localStorage.setItem('addHandoverRecord','1');
                    func.alertWindowGobackTrue('交接记录','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('交接记录','保存失败');
                    //alert('保存失败')
                }
            }else {
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                var data = $('#fmh').serialize();
                //var Case_number_c =  PatientCase.Case_number_c;
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" +  orderNo  +  "&caseCount="  +  caseCount;
                var result = await promise.editHandoverRecord(url,data);
                let newdata = $("#fmh").serializeObject();
                let params = {
                    Task_code_c:Task_code_c,
                    stacd:Station_code_c,
                    orderNo:orderNo,
                    caseNm:Case_number_c,
                    oldData:HandOverStr,
                    newData:JSON.stringify(newdata),
                    userName:userInfo.name
                };
                console.log(params);
                let save = await promise.saveAlterRecord(url,params);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success&&save.success){
                    func.alertWindowGobackTrue('交接记录','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('交接记录','保存失败');
                    //alert('保存失败')
                }
            }
        })
    }
});


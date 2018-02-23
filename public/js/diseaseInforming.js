/**
 * Created by dell on 2018/1/6.
 */
define(function(require, exports, module) {
    exports.run =async function() {
        var promise = require('./promise');
        var util = require('./cxwUtil');
        var func = require('./func');
        require('amazeui');
        require('datatimepicker').run();
        require('zh-cn').run();
        $('.load5').css('height',$(window).height());
        $('.form_datetime-1').datetimepicker({
            language:  'zh-CN',
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            minuteStep: 1,
            theme: 'success'
        });
        var addBaseInfoFlag= localStorage.getItem('addBaseInfoFlag');


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

        var Illteller={} ;
        var IlltellerStr = '';
        if(localStorage.getItem('IlltellerStr')&&(localStorage.getItem('IlltellerStr')!='undefined')){
            IlltellerStr =localStorage.getItem('IlltellerStr');
            Illteller = JSON.parse(IlltellerStr);
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
                var result = Illteller;
                if (result.length>0) {
                    console.log(result);
                    /*全不选，初始化*/
                    //$.messager.alert('提示', result[0].Tell_code_i, 'info');
                    $("[name = truthTelling]:checkbox").attr("checked", false);
                    var boxes = document.getElementsByName("truthTelling");
                    var oldData = result[0];
                    var Tell_code_i = [];
                    for (var l = 0; l < result.length; l++){
                        Tell_code_i.push(result[l].Tell_code_i);
                    }
                    console.log('oldData',oldData);
                    oldData['truthTelling'] = Tell_code_i;
                    for (var j = 0; j < boxes.length; j++) {
                        for (var i = 0; i < result.length; i++) {
                            if (boxes[j].value == result[i].Tell_code_i) {
                                boxes[j].checked = true;
                                if (result[i].Tell_code_i == 4) { //转院
                                    $("#j_content_c").val(result[i].j_content_c);
                                }
                                if (result[i].Tell_code_i == 5) { //与患者关系
                                    $("#y_content_c").val(result[i].y_content_c);
                                }
                                if (result[i].Tell_code_i == 10) { //其他备注
                                    $("#o_content_c").val(result[i].o_content_c);
                                }
                                break;
                            }
                        }
                    }
                    var timeInfo = result[0];
                    for(var k in timeInfo){
                        $('input[name='+ k +']').val(timeInfo[k]);
                        $('textarea[name='+ k +']').val(timeInfo[k]);
                        $('span[name='+ k +']').html(timeInfo[k]);
                    }
                } else {
                    /*全不选，初始化*/
                    $("[name = truthTelling]:checkbox").attr("checked", false);
                }

                for(let k in PatientCase){
                    $('span[name='+ k +']').html(PatientCase[k]);
                }
                break;
            case 'add':
                $('.patient-name').html('新增病历'+'--'+ type );
                var taskInfoArr = await promise.getTaskByID(url,{
                    Task_code_c:Task_code_c,
                    Amb_code_c:Amb_code_c
                });
                if(addBaseInfoFlag=='0'){
                    func.alertWindowGobackTrue('病情告知','请先填写基础信息');
                    //alert('请先填写基础信息');
                    //window.history.go(-1);
                }
                if( localStorage.getItem('addIlltellerFlag')=='1'){

                    var result = Illteller;
                    if (result.length>0) {
                        console.log(result);
                        /*全不选，初始化*/
                        //$.messager.alert('提示', result[0].Tell_code_i, 'info');
                        $("[name = truthTelling]:checkbox").attr("checked", false);
                        var boxes = document.getElementsByName("truthTelling");
                        var oldData = result[0];
                        var Tell_code_i = [];
                        for (var l = 0; l < result.length; l++){
                            Tell_code_i.push(result[l].Tell_code_i);
                        }
                        console.log('oldData',oldData);
                        oldData['truthTelling'] = Tell_code_i;
                        for (var j = 0; j < boxes.length; j++) {
                            for (var i = 0; i < result.length; i++) {
                                if (boxes[j].value == result[i].Tell_code_i) {
                                    boxes[j].checked = true;
                                    if (result[i].Tell_code_i == 4) { //转院
                                        $("#j_content_c").val(result[i].j_content_c);
                                    }
                                    if (result[i].Tell_code_i == 5) { //与患者关系
                                        $("#y_content_c").val(result[i].y_content_c);
                                    }
                                    if (result[i].Tell_code_i == 10) { //其他备注
                                        $("#o_content_c").val(result[i].o_content_c);
                                    }
                                    break;
                                }
                            }
                        }
                        var timeInfo = result[0];
                        for(var k in timeInfo){
                            $('input[name='+ k +']').val(timeInfo[k]);
                            $('textarea[name='+ k +']').val(timeInfo[k]);
                            $('span[name='+ k +']').html(timeInfo[k]);
                        }
                    } else {
                        /*全不选，初始化*/
                        $("[name = truthTelling]:checkbox").attr("checked", false);
                    }
                }else{
                    var taskInfo = taskInfoArr.data[0];console.log(taskInfo);

                    $('input[name=Tell_time]').val(taskInfo.Arr_loc_time);
                }
                orderNo = localStorage.getItem('orderNo');
                var baseInfoStr = localStorage.getItem('baseInfoStr');
                var baseInfo  = JSON.parse(baseInfoStr);
                $('span[name=Name_c]').html(baseInfo.name);
                $('span[name=Sex_c]').html(baseInfo.sex);
                $('span[name=Age_c]').html(baseInfo.age);
                $('span[name=stationName]').html(userInfo.stationName);


                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
                var result = Illteller;
                if (result.length>0) {
                    console.log(result);
                    /*全不选，初始化*/
                    //$.messager.alert('提示', result[0].Tell_code_i, 'info');
                    $("[name = truthTelling]:checkbox").attr("checked", false);
                    var boxes = document.getElementsByName("truthTelling");
                    var oldData = result[0];
                    var Tell_code_i = [];
                    for (var l = 0; l < result.length; l++){
                        Tell_code_i.push(result[l].Tell_code_i);
                    }
                    console.log('oldData',oldData);
                    oldData['truthTelling'] = Tell_code_i;
                    for (var j = 0; j < boxes.length; j++) {
                        for (var i = 0; i < result.length; i++) {
                            if (boxes[j].value == result[i].Tell_code_i) {
                                boxes[j].checked = true;
                                if (result[i].Tell_code_i == 4) { //转院
                                    $("#j_content_c").val(result[i].j_content_c);
                                }
                                if (result[i].Tell_code_i == 5) { //与患者关系
                                    $("#y_content_c").val(result[i].y_content_c);
                                }
                                if (result[i].Tell_code_i == 10) { //其他备注
                                    $("#o_content_c").val(result[i].o_content_c);
                                }
                                break;
                            }
                        }
                    }
                    var timeInfo = result[0];
                    for(var k in timeInfo){
                        $('input[name='+ k +']').val(timeInfo[k]);
                        $('textarea[name='+ k +']').val(timeInfo[k]);
                        $('span[name='+ k +']').html(timeInfo[k]);
                    }
                } else {
                    /*全不选，初始化*/
                    $("[name = truthTelling]:checkbox").attr("checked", false);
                }
                if(!!localStorage.getItem('baseInfoStr')&&localStorage.getItem('baseInfoStr')!='undefined'){
                    var baseInfoStr = localStorage.getItem('baseInfoStr');
                    var baseInfo  = JSON.parse(baseInfoStr);
                    $('span[name=Name_c]').html(baseInfo.name);
                    $('span[name=Sex_c]').html(baseInfo.sex);
                    $('span[name=Age_c]').html(baseInfo.age);
                    $('span[name=stationName]').html(userInfo.stationName);
                }

                break;
        }

        $('.body-content').css('display','block');
        $('.load5').css('display','none');
        $('.submit button').click(async function(){
            let flag = false;
            $('input[name=truthTelling]').each(function(index,ele){
                if($(ele).prop('checked')){
                    flag =true;
                }
            })
            if(!$('input[name=Tell_time]').val()){
                func.alertWindowGobackFalse('病情告知','请输入到达现场时间');
                //alert('请输入到达现场时间');
                return;
            }else if(!$('input[name=Arr_patient_time]').val()){
                func.alertWindowGobackFalse('病情告知','请输入到达患者身边时间');
                //alert('请输入到达患者身边时间');
                return;
            }else if(!flag){
                func.alertWindowGobackFalse('病情告知','请勾选病情告知');

                //alert('请勾选病情告知');
                return;
            }else if(!$('input[name=Relation_c]').val()){
                func.alertWindowGobackFalse('病情告知','请输入患者关系');

                //alert('请输入患者关系');
                return;
            }else if(!$('input[name=Teller_c]').val()){
                func.alertWindowGobackFalse('病情告知','请输入告知人');

                //alert('请输入告知人');
                return;
            }
            $('.body-content').css('display','none');
            $('.load5').css('display','block');
            if(localStorage.getItem('addIlltellerFlag')!='1'){
                let data = $('#fmi').serialize();
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.addIllteller(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    localStorage.setItem('addIlltellerFlag','1');
                    func.alertWindowGobackTrue('病情告知','保存成功')

                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('病情告知','保存失败')
                    //func.alertWindowGoback('病情告知','保存失败',false);
                    //alert('保存失败')
                }
            }else{
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                let data = $('#fmi').serialize();

                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.editIllteller(url,data);
                let newdata = $("#fmi").serializeObject();
                let params = {
                    Task_code_c:Task_code_c,
                    stacd:Station_code_c,
                    orderNo:orderNo,
                    caseNm:Case_number_c,
                    oldData:IlltellerStr,
                    newData:JSON.stringify(newdata),
                    userName:userInfo.name
                };
                console.log(params);
                let save = await promise.saveAlterRecord(url,params);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success&&save.success){
                    func.alertWindowGobackTrue('病情告知','保存成功');
                }else{
                    func.alertWindowGobackFalse('病情告知','保存失败');

                }
            }
        })

    }
});




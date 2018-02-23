/**
 * Created by dell on 2018/1/2.
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
        var addBaseInfoFlag= localStorage.getItem('addBaseInfoFlag');
        console.log(addBaseInfoFlag)

        var patientName =func.getUrlParam('Name_c');
        var type = func.getUrlParam('type');
        var page =  func.getUrlParam('page');
        var Task_code_c =func.getUrlParam('Task_code_c');
        var Amb_code_c =func.getUrlParam('Amb_code_c');
        var orderNo =func.getUrlParam('orderNo');
        var Station_code_c =func.getUrlParam('Station_code_c');
        var caseCount =func.getUrlParam('caseCount');

        $('.load5').css('height',$(window).height())
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
                    func.alertWindowGobackTrue('体格检查','请先填写基础信息');
                    //alert('请先填写基础信息');
                    //window.history.go(-1);
                }
                //if( localStorage.getItem('addPhysicalExaminationFlag')=='1'){
                //    func.alertWindowGoback('体格检查','体格检查已填写',true);
                //    //alert('体格检查已填写');
                //    //window.history.go(-1);
                //}
                orderNo = localStorage.getItem('orderNo');
                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
                break;
        }
        //var IlltellerStr = localStorage.getItem('IlltellerStr');
        //var Illteller = JSON.parse(IlltellerStr);
        //var HandOverStr = localStorage.getItem('HandOverStr');
        //var HandOver = JSON.parse(HandOverStr);
        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        var userInfo = JSON.parse(localStorage.getItem('userInfoStr'))
        var url = config.centerApiHost + ':' + config.centerApiPort;


        var DPhysicalExaminationq = await promise.getDPhysicalExaminationq(url,{});
        //func.addName(DPhysicalExaminationq.data);
        func.deleteFirst(DPhysicalExaminationq.data);
        func.render($('#optionTemName'),$('select[name=T_q_c]'),DPhysicalExaminationq);
        func.render($('#optionTemName'),$('select[name=P_q_c]'),DPhysicalExaminationq);
        func.render($('#optionTemName'),$('select[name=R_q_c]'),DPhysicalExaminationq);
        func.render($('#optionTemName'),$('select[name=BP_q_c]'),DPhysicalExaminationq);
        func.render($('#optionTemName'),$('select[name=Pupil_L_q_c]'),DPhysicalExaminationq);
        func.render($('#optionTemName'),$('select[name=Pupil_R_q_c]'),DPhysicalExaminationq);

        var DPosition = await promise.getDPosition(url,{});
        //func.addName(DPosition.data);
        func.deleteFirst(DPosition.data);
        func.render($('#optionTemName'),$('select[name=Position_c]'),DPosition);
        var DMind = await promise.getDMind(url,{});
        //func.addName(DMind.data);
        func.deleteFirst(DMind.data);
        func.render($('#optionTemName'),$('select[name=Mind_c]'),DMind);
        var DSkin = await promise.getDSkin(url,{});
        //func.addName(DSkin.data);
        func.deleteFirst(DSkin.data);
        func.render($('#optionTemName'),$('select[name=Skin_c]'),DSkin);

        var DCyanosis = await promise.getDCyanosis(url,{});
        //func.addName(DCyanosis.data);
        func.deleteFirst(DCyanosis.data);
        func.render($('#optionTemName'),$('select[name=Cyanosis_c]'),DCyanosis);

        var DLightReflex = await promise.getDLightReflex(url,{});
        console.log(DLightReflex)
        //func.addName(DLightReflex.data);
        func.deleteFirst(DLightReflex.data);
        func.render($('#optionTemName'),$('select[name=Lightreflex_L_c]'),DLightReflex);
        func.render($('#optionTemName'),$('select[name=Lightreflex_R_c]'),DLightReflex);



        $("li").each(function(i,v){func.cleanWhitespace(v)});
        var taskInfoArr = await promise.getTaskByID(url,{
            Task_code_c:Task_code_c,
            Amb_code_c:Amb_code_c
        });
        var taskInfo = taskInfoArr.data[0];
        //for(let k in taskInfo){
        //    $('input[name='+ k +']').val(taskInfo[k]);
        //    $('textarea[name='+ k +']').val(taskInfo[k]);
        //    if(!!taskInfo[k]){
        //        $('select[name='+ k +']').find('option[text='+ taskInfo[k] +']').attr('selected', true);
        //        $('select[name='+ k +']').trigger('changed.selected.amui');
        //    }
        //}
        for(let k in PatientCase){
            $('input[name='+ k +']').val(PatientCase[k]);
            $('textarea[name='+ k +']').val(PatientCase[k]);
            if(!!PatientCase[k]&&PatientCase[k]!='点击选择...'){
                $('select[name='+ k +']').find('option[text='+ PatientCase[k] +']').attr('selected', true);
                $('select[name='+ k +']').find('option[value='+ PatientCase[k] +']').attr('selected', true);
                $('select[name='+ k +']').trigger('changed.selected.amui');
            }
        }
        $('.body-content').css('display','block');
        $('.load5').css('display','none');
        $('.submit button').click(async function(){
            $('.body-content').css('display','none');
            $('.load5').css('display','block');
            if(localStorage.getItem('addPhysicalExaminationFlag')!='1'){
                let data = $('#fmp').serialize();
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }

                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                       + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.addPhysicalExamination(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    localStorage.setItem('addPhysicalExaminationFlag','1');
                    func.alertWindowGobackTrue('体格检查','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('体格检查','保存失败');
                    //alert('保存失败')
                }
            }else {
                let Case_number_c;
                if(page=='add'){
                    Case_number_c =  localStorage.getItem('Case_number_c');
                }else{
                    Case_number_c =  PatientCase.Case_number_c;
                }
                let data = $('#fmp').serialize();


                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo + "&caseCount=" + caseCount;
                let result = await promise.editPhysicalExamination(url,data);
                let newdata = $("#fmp").serializeObject();

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
                    func.alertWindowGobackTrue('体格检查','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('体格检查','保存失败');
                    //alert('保存失败')
                }
            }
        })
    }
});




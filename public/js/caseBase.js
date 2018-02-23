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
        //var IlltellerStr = localStorage.getItem('IlltellerStr');
        //var Illteller = JSON.parse(IlltellerStr);
        //var HandOverStr = localStorage.getItem('HandOverStr');
        //var HandOver = JSON.parse(HandOverStr);
        var configStr = localStorage.getItem('configStr')
        var config = JSON.parse(configStr);
        var url = config.centerApiHost + ':' + config.centerApiPort;
        try{
            var taskInfoArr = await promise.getTaskByID(url,{
                Task_code_c:Task_code_c,
                Amb_code_c:Amb_code_c
            });
            var taskInfo = taskInfoArr.data[0];
        }catch(err){
            console.log('get taskInfoArr err:'+ err);
        }


        var userInfo = JSON.parse(localStorage.getItem('userInfoStr'));
        switch(page){
            case 'view':
                $('.submit').css('display','none');
                $('.patient-name').html('查看病历--'+ patientName+ '--'+ type );
                break;
            case 'add':
                $('.patient-name').html('新增病历'+'--'+ type );
                //if(addBaseInfoFlag=='1'){
                //    //alert('基础信息已添加');
                //    func.alertWindowGoback('基础信息','基础信息已添加',true);
                //}
                break;
            case 'edit':
                $('.patient-name').html('编辑病历--'+ patientName+ '--'+ type );
                break;
        }
        try{
            var DAge =  await promise.getDAge(url,{});
            func.deleteFirst(DAge.data)
            console.log(DAge);
            func.render($('#optionTemName'),$('select[name=Age_c]'),DAge);
        }catch(err){
            console.log('getDageErr:'+ err)
        }
        try{
            var DFolk = await promise.getDFolk(url,{});
            func.addName(DFolk.data);
            func.render($('#optionTemCode'),$('select[name=Folk_i]'),DFolk);
        }catch(err){
            console.log('getDFolkErr:'+ err)
        }

        try{
            var DInDepartment = await promise.getDInDepartment (url,{});
            DInDepartment.data.forEach(function(v,i,arr){
                if(v.Code_i==0){
                    v.Name_c="点击选择..."
                }
            })
            func.render($('#optionTemCode'),$('select[name=In_Department_i]'),DInDepartment);
        }catch(err){
            console.log('getDInDepartmentErr:'+ err)
        }


        try{
            var Department_c = await promise.getDDepartment (url,{});
            func.addName(Department_c.data);
            func.render($('#optionTemCode'),$('select[name=Department_i]'),Department_c);
            func.render($('#optionTemName'),$('select[name=Send_add_c]'),Department_c);
        }catch(err){
            console.log('getDepartment_cErr:'+ err)
        }

        var DLinkman = await promise.getDLinkman(url,{});
        func.addName(DLinkman.data);
        func.render($('#optionTemName'),$('select[name =Provider_c]'),DLinkman);
        if(taskInfo){
            DLinkman.data.unshift({
                Code_i: 0,
                Name_c: taskInfo.Linkman_c
            })
        }

        func.render($('#optionTemName'),$('select[name =Linkman_c]'),DLinkman);
        var DOutComes = await promise.getDOutComes(url,{});
        func.addName(DOutComes.data);
        func.render($('#optionTemCode'),$('select[name=Outcomes_i]'),DOutComes);
        var DDiseaseReason = await promise.getDDiseaseReason(url,{});
        func.addName(DDiseaseReason.data);
        console.log(DDiseaseReason)
        func.render($('#optionTemCode'),$('select[name=Help_reason_i]'),DDiseaseReason);
        var DILLState = await promise.getDILLState(url,{});
        func.addName(DILLState.data);
        func.render($('#optionTemCode'),$('select[name=Ill_state_i]'),DILLState);
        var DCureResult = await promise.getDCureResult(url,{});
        func.addName(DCureResult.data);
        func.render($('#optionTemCode'),$('select[name=Cure_result_i]'),DCureResult);
        var DDiseaseClass = await promise.getDDiseaseClass(url,{});
        func.addName(DDiseaseClass.data);
        func.render($('#optionTemCode'),$('select[name=Disease_type_i]'),DDiseaseClass);
        var Stations = await promise.getStations(url,{});
        func.addChoose(Stations.data);
        func.render($('#station'),$('select[name=Send_hos_c]'),Stations);
        var Doctors = await promise.getPersonsByPersonType(url,{
            stationCode:Station_code_c,
            personType:4
        });
        func.addChoose(Doctors.data);
        func.render($('#doctor'),$('select[name=Doctor_c]'),Doctors);
        var Nurses = await promise.getPersonsByPersonType(url,{
            stationCode:Station_code_c,
            personType:5
        });
        func.addChoose(Nurses.data);
        func.render($('#doctor'),$('select[name=Nurse_c]'),Nurses);
        var Drivers = await promise.getPersonsByPersonType(url,{
            stationCode:Station_code_c,
            personType:3
        });
        func.addChoose(Drivers.data);
        func.render($('#doctor'),$('select[name=Driver_c]'),Drivers);
        var DPmhq = await promise.getDPmhq(url,{});
        func.deleteFirst(DPmhq.data)
        func.render($('#optionTemName'),$('select[name=Pmh_content_c]'),DPmhq);
        var DAllergyq = await promise.getDAllergyq(url,{});
        console.log(DAllergyq.data);
        func.deleteFirst(DAllergyq.data)
        func.render($('#optionTemName'),$('select[name=Allergy_c]'),DAllergyq);
        $("li").each(function(i,v){func.cleanWhitespace(v)});
        for(let k in taskInfo){
            $('input[name='+ k +']').val(taskInfo[k]);
            $('textarea[name='+ k +']').val(taskInfo[k]);
            if(!!taskInfo[k]){
                $('select[name='+ k +']').find('option[text='+ taskInfo[k] +']').attr('selected', true);
                $('select[name='+ k +']').trigger('changed.selected.amui');
            }
        }
        for(let k in PatientCase){
            $('input[name='+ k +']').val(PatientCase[k]);
            $('textarea[name='+ k +']').val(PatientCase[k]);
            if(!!PatientCase[k]){
                //if(k=='Disease_type_i'){
                    $('select[name='+ k +']').find('option[value='+ PatientCase[k] +']').attr('selected', true);
                //}else{
                    $('select[name='+ k +']').find('option[text='+ PatientCase[k] +']').attr('selected', true);
                //}

                $('select[name='+ k +']').trigger('changed.selected.amui');
            }
        }
        $('.body-content').css('display','block');
        $('.load5').css('display','none');
        $('.submit button').click(async function(){
            if(!$('input[name=Name_c]').val()){
                func.alertWindowGobackFalse('基础信息','请输入姓名');
                return;
            }else if($('select[name=Disease_type_i]').find('option:selected').html()=='点击选择...'||!$('select[name=Disease_type_c]').find('option:selected').html()=='点击选择...' ){
                //alert('请输入疾病类型');
                func.alertWindowGobackFalse('基础信息','请输入疾病类型');
                return;
            }
            var addBaseInfoFlag= localStorage.getItem('addBaseInfoFlag');
            $('.body-content').css('display','none');
            $('.load5').css('display','block');

            if(page=='add'&&addBaseInfoFlag !='1'){
                let data = $('#fm').serialize();
                let Case_number_c =  Station_code_c + Amb_code_c + util.getCurrentDate() + util.getCaseCount(caseCount);
                localStorage.setItem('Case_number_c',Case_number_c);
                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c + "&userName=" + userInfo.name
                let result = await promise.addPatientCaseBaseInfo(url,data);
                console.log(result);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){

                    localStorage.setItem('addBaseInfoFlag','1');
                    localStorage.setItem('orderNo',result.data);
                    var baseInfo = {
                        sex:  $('#Sex_c').val(),
                        age : $("#Age_c").val(),
                        name : $("#Name_c").val(),
                        illState_i : $("#Ill_state_c").val(),
                        illState_c:$("#Ill_state_c").find('option:selected').html(),
                        Send_hos_i:$('#Send_hos_c').val(),
                        Send_hos_c:$('#Send_hos_c').find('option:selected').html(),
                    };
                    var baseInfoStr = JSON.stringify(baseInfo)
                    localStorage.setItem('baseInfoStr',baseInfoStr);
                    func.alertWindowGobackTrue('基础信息','保存成功')
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('基础信息','保存失败')
                }
            }else {
                let Case_number_c
                if(addBaseInfoFlag=='1'){
                    Case_number_c=  localStorage.getItem('Case_number_c');
                    orderNo =  localStorage.getItem('orderNo');
                }else{
                    Case_number_c=  PatientCase.Case_number_c;
                }
                let data = $('#fm').serialize();

                data = data +"&Task_code_c=" + Task_code_c +"&Station_code_c=" + Station_code_c  + "&Case_number_c=" + Case_number_c + "&Amb_code_c=" + Amb_code_c
                    + "&userName=" + userInfo.name + "&orderNo=" + orderNo
                let result = await promise.editPatientCaseBaseInfo(url,data);
                let newdata = $("#fm").serializeObject();
                newdata.Department_c = $('#Department_c').find("option:selected").text();
                newdata.In_Department_c = $("#In_Department_c").find("option:selected").text();
                newdata.Folk_c = $('#Folk_c').find("option:selected").text();
                newdata.Help_reason_c = $('#Help_reason_c').find("option:selected").text();
                newdata.Disease_type_c = $('#Disease_type_c').find("option:selected").text();
                newdata.Ill_state_c = $('#Ill_state_c').find("option:selected").text();
                newdata.Cure_result_c = $('#Cure_result_c').find("option:selected").text();
                newdata.Outcomes_c = $('#Outcomes_c').find("option:selected").text();
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
                    var baseInfo = {
                        sex:  $('#Sex_c').val(),
                        age : $("#Age_c").val(),
                        name : $("#Name_c").val(),
                        illState_i : $("#Ill_state_c").val(),
                        illState_c:$("#Ill_state_c").find('option:selected').html(),
                        Send_hos_i:$('#Send_hos_c').val(),
                        Send_hos_c:$('#Send_hos_c').find('option:selected').html(),
                    };
                    var baseInfoStr = JSON.stringify(baseInfo)
                    localStorage.setItem('baseInfoStr',baseInfoStr);
                    func.alertWindowGobackTrue('基础信息','保存成功')
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('基础信息','保存失败')
                }
            }
        })

    }
});




/**
 * Created by dell on 2018/1/12.
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
            $('.btn').click(function(){
                $(this).prev().datetimepicker('update', new Date());
            })
        })

        var Task_code_c = func.getUrlParam('Task_code_c') ;
        var Station_code_c = func.getUrlParam('Station_code_c');
        //'001'
        var Ambulance_code_c =func.getUrlParam('Ambulance_code_c');
        var stationName = func.getUrlParam('stationName');
        var userName = func.getUrlParam('userName');
        //'00001'
        var userInfo = {
            name:userName,
            stationName:stationName,
            stationCode: Station_code_c
        };


        var config = await promise.getConfig();
        var url = config.centerApiHost + ':' + config.centerApiPort;
        var addChestpainTime = false;
        var ChestpainCaseArr =  await promise.getChestpainCase(url,{
            taskCode:Task_code_c
        });
        console.log(ChestpainCaseArr)
        if(ChestpainCaseArr.data.length>0){
            addChestpainTime = true;
            let ChestpainCase = ChestpainCaseArr.data[0]
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
                    console.log(k,ChestpainCase[k])
                    $('textarea[name='+ k +']').html(ChestpainCase[k]);
                }
            }
        }else{
            addChestpainTime = false;
        }
        $('.submit button').click(async function(){
            $('.body-content').css('display','none');
            $('.load5').css('display','block');

            var data = $('#chestpainCaseTime').serialize();
            data = data +"&taskCode=" + Task_code_c + "&userName=" + userInfo.name;
            if(!addChestpainTime){
                let result = await promise.addChestpainTime(url,data);
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    func.alertWindowClose('急性胸痛患者院前时间管理表','保存成功');
                    //alert('保存成功');
                    //window.history.go(-1);
                }else{
                    func.alertWindowGobackFalse('急性胸痛患者院前时间管理表','保存失败');
                    //alert('保存失败')
                }
            }else{
                let result ;
                try{
                    result = await promise.editChestpainCase(url,data);
                }catch(err){
                    func.alertWindowGobackFalse('急性胸痛患者院前时间管理表','保存失败：'+ err,false);
                }
                $('.body-content').css('display','block');
                $('.load5').css('display','none');
                if(result.success){
                    func.alertWindowClose('急性胸痛患者院前时间管理表','保存成功');

                }else{
                    func.alertWindowGobackFalse('急性胸痛患者院前时间管理表','保存失败');
                    //alert('保存失败')
                }
            }
        })

    }

});






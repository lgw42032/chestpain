/**
 * Created by dell on 2018/1/4.
 */
define(function(require, exports, module) {
    exports.run = async function() {
        var promise = require('./promise');
        var util = require('./cxwUtil');
        var func = require('./func');
        require('amazeui');
        require('handlebars');
        require('widgets');

        //$('.am-header .am-header-title img').click(function(){
        //
        //})
        $('.load5').css('height',$(window).height())
        var config = await promise.getConfig();
        var configStr = JSON.stringify(config);
        localStorage.setItem('configStr',configStr);
        localStorage.removeItem('addBaseInfoFlag');
        localStorage.removeItem('addPhysicalExaminationFlag');
        localStorage.removeItem('addAuxiliaryExaminationFlag');
        localStorage.removeItem('addRescueMeasuresFlag');
        localStorage.removeItem('addIlltellerFlag');
        localStorage.removeItem('addHandoverRecord');
        localStorage.removeItem('addChestpainCaseFlag');
        localStorage.removeItem('baseInfoStr');
        localStorage.removeItem('orderNo');


        var url = config.centerApiHost + ':' + config.centerApiPort;
        //'20171214130429VJb0uSgob4'
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
        var userInfoStr = JSON.stringify(userInfo);
        localStorage.setItem('userInfoStr',userInfoStr);
        var cases = await  promise.getCaseByTaskCode(url,{
            Task_code_c:Task_code_c
        });
        console.log(cases);
        var caseCount = cases.length;
        var TableList=$('#case-table'),
            tplTableList= TableList.html(),
            templateTableList= Handlebars.compile(tplTableList),
            htmlTableList= templateTableList(cases);
        $('.list').html(htmlTableList);
        $('.body-content').css('display','block');
        $('.load5').css('display','none');
        $('.showCase').click(function(){
            var paramsStr = $(this).attr('data-params');
            var paramsArr = paramsStr.split(',');
            window.location.href = "caseCategory.html?page=view&Task_code_c="+ paramsArr[0] + "&orderNo=" + paramsArr[1] + "&Ambulance_code_c=" + paramsArr[2]
                                     + "&Name_c=" + paramsArr[3]  + "&Station_code_c=" + paramsArr[4];

        });
        $('.editCase').click(function(){
            var paramsStr = $(this).attr('data-params');
            var paramsArr = paramsStr.split(',');
            window.location.href = "caseCategory.html?page=edit&Task_code_c="+ paramsArr[0] + "&orderNo=" + paramsArr[1] + "&Ambulance_code_c=" + paramsArr[2]
                + "&Station_code_c=" + paramsArr[3] + "&Name_c=" + paramsArr[4] ;

        });
        $('.add').attr('href','caseCategory.html?page=add&Task_code_c='+ Task_code_c + "&Station_code_c=" + Station_code_c + "&caseCount=" + caseCount + "&Ambulance_code_c=" + Ambulance_code_c  );
        $('.add').click(function(){
            localStorage.setItem('addBaseInfoFlag','0');
        });
        $('.destroyCase').click(function(){

            var paramsStr = $(this).attr('data-params');
            var paramsArr = paramsStr.split(',');
            $('#my-confirm').modal({
                relatedTarget: this,
                onConfirm: function(options) {

                    destroyCase.apply(window,paramsArr);
                },
                // closeOnConfirm: false,
                onCancel: function() {
                    return;
                }
            });

        });
        async function destroyCase(Task_code_c,orderNo,Local_c,Name_c){

            var data = {
                Task_code_c:Task_code_c,
                orderNo:orderNo,
                Local_c:Local_c,
                Name_c:Name_c
            }
            console.log(data);
            var result = await promise.deletePatientCase(url,data);
            if(result.success){
                alertWindowReload('删除成功',true);

                //alert('删除成功');
                //location.reload();
            }else{
                //alert('删除失败');
                alertWindowReload('删除失败',false);
            }

        }
        function alertWindowReload(content,isReload){
            console.log('lgw');
            $('.alert-content').html(content);
            var alert = $('#my-alert');
            if(isReload){
                alert.modal({
                    onConfirm:function(){
                        location.reload();
                    }
                });
            }else{
                alert.modal();
            }


        }
    }
});

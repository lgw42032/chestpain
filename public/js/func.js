/**
 * Created by dell on 2017/12/20.
 */
define(function(require, exports, module) {
    var cxwUtil = require('./cxwUtil');
    module.exports = {
        toggleInfo:function(){
            $(this).nextSibling('tr').toggle();
        }  ,
        formatSeconds:function(second){
            var ss = '0';
            if (!isNaN(second)) {
                var hours = Math.floor(second / (60 * 60));
                var minutes = Math.floor(second / 60) - hours * 60;
                var seconds = second - minutes * 60 - hours * 60 * 60;
                seconds = parseInt(seconds);
                //console.log("total:" + second + "hours:" + hours + ";minutes:" + minutes + ";seconds:" + seconds);
                if (hours > 0) {
                    if(minutes < 10){ minutes = '0' + minutes;}
                    if(seconds < 10){ seconds = '0' + seconds;}
                    ss = hours + ':' + minutes + ':' + seconds;
                }else if (minutes > 0) {
                    if(seconds < 10){seconds = '0' + seconds;}
                    ss = minutes + ':' + seconds;
                }
                else{
                    ss = seconds;
                }
            }
            return ss;
        },
        calculateRate:function(total,portion){
            if (isNaN(total)) {
                total = 0;
            }
            if (isNaN(portion)) {
                portion = 0;
            }
            return (Math.round(portion / total * 10000) / 100.00 + "%");// 小数点后两位百分比
        },
        getUrlParam:function(key){
            // 获取参数
            var url = window.location.search;
            // 正则筛选地址栏
            var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
            // 匹配目标参数
            var result = url.substr(1).match(reg);
            //返回参数值
            return result ? decodeURIComponent(result[2]) : null;
        },
        getRecordMonth:function(name){
            var parsedName = "";
            if(cxwUtil.isEmpty(name)){
                return name;
            }
            if(name.substr(0,1) != '-'){
                parsedName = name.substr(0,4);
                parsedName += name.substr(5,2);
            }else{
                parsedName = name.substr(1,4);
                parsedName += name.substr(6,2);
            }
            return parsedName;
        },
        getRecordDate:function(name){
            var parsedName = "";
            if(cxwUtil.isEmpty(name)){
                return name;
            }
            //2017-03-03
            if(name.substr(0,1) != '-'){
                parsedName = name.substr(0,4);
                parsedName += name.substr(5,2);
                parsedName += name.substr(8,2);
            }else{
                parsedName = name.substr(1,4);
                parsedName += name.substr(6,2);
                parsedName += name.substr(9,2);
            }
            return parsedName;
        },
        parsedSrc:function(RecordServerIP,recordFileName){
            var monthName = this.getRecordMonth(recordFileName);
            var dateName = this.getRecordDate(recordFileName);
            var parsedSrc = RecordServerIP + monthName + '/' + dateName + '/'+ recordFileName ;
            return parsedSrc;
        },
        render:function(tel,parent,data){
            var tableList = tel,
                tplTableList= tableList.html(),
                templateTableList= Handlebars.compile(tplTableList),
                htmlTableList= templateTableList( data );
            parent.html(htmlTableList);
        },
        addName:function(data){
            data.forEach(function(v,i,arr){
                if(v.Code_i==0){
                    v.Name_c="点击选择..."
                    //v={};
                    //delete v.Code_i;
                    //delete v.Name_c
                }
            })
            return data
        },
        deleteFirst:function(data){
            data.forEach(function(v,i,arr){
                if(v.Code_i==0){
                    //v.Name_c="点击选择..."
                    //v={};
                    delete v.Code_i;
                    delete v.Name_c
                }
            })
            return data
        },

        addChoose:function(data){
            data.unshift({})
        },

        cleanWhitespace:function(element){
            for(var i=0; i<element.childNodes.length; i++)
            {
                var node = element.childNodes[i];
                if(node.nodeType == 3 && !/\S/.test(node.nodeValue))
                {
                    node.parentNode.removeChild(node);
                }
            }
        },
        alertWindowGobackTrue:function(title,content){
            $('#gobackTrue .alert-title').html(title);
            $('#gobackTrue .alert-content').html(content);
            var alertWindow = $('#gobackTrue');
            alertWindow.modal({
                onConfirm:function(){
                    window.history.go(-1);
                    //window.location.href=document.referrer;
                    //window.history.back();
                    //location.reload();
                    //window.history.back(-2);

                }
            });
        },
        alertWindowGobackFalse:function(title,content){
            $('#gobackFalse .alert-title').html(title);
            $('#gobackFalse .alert-content').html(content);
            var alertWindow = $('#gobackFalse');
            alertWindow.modal();
        },
        alertWindowClose:function(title,content,goback){
            $('#windowClose .alert-title').html(title);
            $('#windowClose .alert-content').html(content);
            var alert = $('#windowClose');
            alert.modal({
                onConfirm:function(){
                    window.android.finishActivity();
                }
            });
        },
        moveCenterScreen:function(ele){
            let domHeight =  ele.offset().top;
            let windowHeight =$(window).height();
            let scrollTop = domHeight - windowHeight/2;
            alert(scrollTop);
            $('body').scrollTop(scrollTop);
        }
    }
})

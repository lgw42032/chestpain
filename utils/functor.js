/**
 * Created by Administrator on 2015/4/23.
 */
var db = require('../utils/database');
var logger = require('log4js').getLogger("hospital");//日志

module.exports = {
    md5: function (data) {
        var Buffer = require("buffer").Buffer;
        var buf = new Buffer(data);
        var str = buf.toString("binary");
        var crypto = require("crypto");
        return crypto.createHash("md5").update(str).digest("hex");
    },
    rand: function (min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
};
module.exports.groupBy = function (array, f) {
    var groups = {};
    array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    })
};

module.exports.isEmpty = function (data) {
    if (typeof data == "string") {
        if (data == "") {
            return true;
        }
    }
    if (typeof data == 'undefined' || data == null || data === undefined) {
        return true;
    }

    if (typeof(data) == 'object' && Object.keys(data).length === 0) {
        return true;
    }
    return false;
};

module.exports.isExists = function (obj) {
    if (typeof obj == 'undefined' || obj === undefined) {
        return false;
    } else {
        return true;
    }

};

module.exports.notExists = function (obj) {
    if (typeof obj == 'undefined' || obj === undefined) {
        return true;
    } else {
        return false;
    }

};

module.exports.echoError = function (res, msg, data) {
    res.json({
        success: false,
        msg: msg,
        data: data
    });
};

module.exports.echoSuccess = function (res, msg, data) {
    res.json({
        success: true,
        msg: msg,
        data: data
    });
};


module.exports.inArray = function (item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (item == arr[i]) {
            return true;
        }
    }
    return false;
};


/**
 * 判断两个字符串是否相等
 * @param str1
 * @param str2
 * @returns {boolean}
 */
module.exports.isEquals = function (str1, str2) {
    if (str1 == str2) {
        return true;
    }
    return false;
};

/**
 * 本月第一天
 * @returns {string}
 */
module.exports.firstOfMouth = function () {
    var curr_time = new Date();
    var y = curr_time.getFullYear();
    var m = curr_time.getMonth() + 1;
    return y + '-' + (m < 10 ? ('0' + m) : m) + "-01 " + "00:00:00";
};

/**
 * 当前日期
 * @returns {string}
 */
module.exports.getCurrentTime = function () {
    var curr_time = new Date();
    var y = curr_time.getFullYear();
    var m = curr_time.getMonth() + 1;
    var d = curr_time.getDate();
    var hh = curr_time.getHours();
    var mm = curr_time.getMinutes();
    var ss = curr_time.getSeconds();
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d)
        + ' ' + (hh < 10 ? ('0' + hh) : hh) + ':'
        + (mm < 10 ? ('0' + mm) : mm) + ':' + (ss < 10 ? ('0' + ss) : ss);
};


/**
 * 获取当前日期前后AddDayCount天
 * @param AddDayCount
 * @returns {string}
 * @constructor
 */
module.exports.GetDateStr = function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d + " 00:00:00";
};

/**
 * 把秒格式化成几时几分几秒
 * @param second
 * @returns {string}
 */
module.exports.formatSecond = function (second) {
    var ss = '0秒';
    if (!isNaN(second)) {
        var hours = Math.floor(second / (60 * 60));
        var minutes = Math.floor(second / 60) - hours * 60;
        var seconds = second - minutes * 60 - hours * 60 * 60;
        seconds = parseInt(seconds);
        //console.log("total:" + second + "hours:" + hours + ";minutes:" + minutes + ";seconds:" + seconds);
        if (hours > 0) {
            ss = hours + '时' + minutes + '分' + seconds + '秒';
        } else if (minutes > 0) {
            ss = minutes + '分' + seconds + '秒';
        } else {
            ss = seconds + '秒';
        }
    }
    return ss;
};
module.exports.formatSeconds = function (second) {
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
};

/**
 * 计算百分比
 * @param total
 * @param portion
 * @returns {string}
 */
module.exports.calculateRate = function (total, portion) {
    if (isNaN(total)) {
        total = 0;
    }
    if (isNaN(portion)) {
        portion = 0;
    }
    return (Math.round(portion / total * 10000) / 100.00 + "%");// 小数点后两位百分比
};

module.exports.splitDate = function (d, isZero) {
    var yyyy;
    var MM;
    var dd;
    var hh;
    var mm;
    var ss;
    if(isZero){
        yyyy=d.getYear();
        MM=(d.getMonth()+1)<10?"0"+(d.getMonth()+1):d.getMonth()+1;
        dd=d.getDate()<10?"0"+d.getDate():d.getDate();
        hh=d.getHours()<10?"0"+d.getHours():d.getHours();
        mm=d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes();
        ss=d.getSeconds()<10?"0"+d.getSeconds():d.getSeconds();
    }else{
        yyyy=d.getYear();
        MM=d.getMonth()+1;
        dd=d.getDate();
        hh=d.getHours();
        mm=d.getMinutes();
        ss=d.getSeconds();
    }
    return {"yyyy":yyyy,"MM":MM,"dd":dd,"hh":hh,"mm":mm,"ss":ss};

};
/**
 *功能:格式化时间
 *示例:DateUtilFormat("yyyy/MM/dd","Thu Nov 9 20:30:37 UTC+0800 2006 ");
 *返回:2006/11/09
 */
module.exports.DateUtilFormat = function (fmtCode, date) {
    var result;
    var d;
    var arr_d;

    var patrn_now_1=/^y{4}-M{2}-d{2}\sh{2}:m{2}:s{2}$/;
    var patrn_now_11=/^y{4}-M{1,2}-d{1,2}\sh{1,2}:m{1,2}:s{1,2}$/;

    var patrn_now_2=/^y{4}\/M{2}\/d{2}\sh{2}:m{2}:s{2}$/;
    var patrn_now_22=/^y{4}\/M{1,2}\/d{1,2}\sh{1,2}:m{1,2}:s{1,2}$/;

    var patrn_now_3=/^y{4}年M{2}月d{2}日\sh{2}时m{2}分s{2}秒$/;
    var patrn_now_33=/^y{4}年M{1,2}月d{1,2}日\sh{1,2}时m{1,2}分s{1,2}秒$/;

    var patrn_date_1=/^y{4}-M{2}-d{2}$/;
    var patrn_date_11=/^y{4}-M{1,2}-d{1,2}$/;

    var patrn_date_2=/^y{4}\/M{2}\/d{2}$/;
    var patrn_date_22=/^y{4}\/M{1,2}\/d{1,2}$/;

    var patrn_date_3=/^y{4}年M{2}月d{2}日$/;
    var patrn_date_33=/^y{4}年M{1,2}月d{1,2}日$/;

    var patrn_time_1=/^h{2}:m{2}:s{2}$/;
    var patrn_time_11=/^h{1,2}:m{1,2}:s{1,2}$/;
    var patrn_time_2=/^h{2}时m{2}分s{2}秒$/;
    var patrn_time_22=/^h{1,2}时m{1,2}分s{1,2}秒$/;

    if(!fmtCode){fmtCode="yyyy/MM/dd hh:mm:ss";}
    if(date){
        d=new Date(date);
        if(isNaN(d)){
            console.log("时间参数非法\n正确的时间示例:\nThu Nov 9 20:30:37 UTC+0800 2006\n或\n2006/      10/17");
            return;}
    }else{
        d=new Date();
    }

    if(patrn_now_1.test(fmtCode))
    {
        arr_d=splitDate(d,true);
        result=arr_d.yyyy+"-"+arr_d.MM+"-"+arr_d.dd+" "+arr_d.hh+":"+arr_d.mm+":"+arr_d.ss;
    }
    else if(patrn_now_11.test(fmtCode))
    {
        arr_d=splitDate(d);
        result=arr_d.yyyy+"-"+arr_d.MM+"-"+arr_d.dd+" "+arr_d.hh+":"+arr_d.mm+":"+arr_d.ss;
    }
    else if(patrn_now_2.test(fmtCode))
    {
        arr_d=splitDate(d,true);
        result=arr_d.yyyy+"/"+arr_d.MM+"/"+arr_d.dd+" "+arr_d.hh+":"+arr_d.mm+":"+arr_d.ss;
    }
    else if(patrn_now_22.test(fmtCode))
    {
        arr_d=splitDate(d);
        result=arr_d.yyyy+"/"+arr_d.MM+"/"+arr_d.dd+" "+arr_d.hh+":"+arr_d.mm+":"+arr_d.ss;
    }
    else if(patrn_now_3.test(fmtCode))
    {
        arr_d=splitDate(d,true);
        result=arr_d.yyyy+"年"+arr_d.MM+"月"+arr_d.dd+"日"+" "+arr_d.hh+"时"+arr_d.mm+"分"+arr_d.ss+"秒";
    }
    else if(patrn_now_33.test(fmtCode))
    {
        arr_d=splitDate(d);
        result=arr_d.yyyy+"年"+arr_d.MM+"月"+arr_d.dd+"日"+" "+arr_d.hh+"时"+arr_d.mm+"分"+arr_d.ss+"秒";
    }

    else if(patrn_date_1.test(fmtCode))
    {
        arr_d=splitDate(d,true);
        result=arr_d.yyyy+"-"+arr_d.MM+"-"+arr_d.dd;
    }
    else if(patrn_date_11.test(fmtCode))
    {
        arr_d=splitDate(d);
        result=arr_d.yyyy+"-"+arr_d.MM+"-"+arr_d.dd;
    }
    else if(patrn_date_2.test(fmtCode))
    {
        arr_d=splitDate(d,true);
        result=arr_d.yyyy+"/"+arr_d.MM+"/"+arr_d.dd;
    }
    else if(patrn_date_22.test(fmtCode))
    {
        arr_d=splitDate(d);
        result=arr_d.yyyy+"/"+arr_d.MM+"/"+arr_d.dd;
    }
    else if(patrn_date_3.test(fmtCode))
    {
        arr_d=splitDate(d,true);
        result=arr_d.yyyy+"年"+arr_d.MM+"月"+arr_d.dd+"日";
    }
    else if(patrn_date_33.test(fmtCode))
    {
        arr_d=splitDate(d);
        result=arr_d.yyyy+"年"+arr_d.MM+"月"+arr_d.dd+"日";
    }
    else if(patrn_time_1.test(fmtCode)){
        arr_d=splitDate(d,true);
        result=arr_d.hh+":"+arr_d.mm+":"+arr_d.ss;
    }
    else if(patrn_time_11.test(fmtCode)){
        arr_d=splitDate(d);
        result=arr_d.hh+":"+arr_d.mm+":"+arr_d.ss;
    }
    else if(patrn_time_2.test(fmtCode)){
        arr_d=splitDate(d,true);
        result=arr_d.hh+"时"+arr_d.mm+"分"+arr_d.ss+"秒";
    }
    else if(patrn_time_22.test(fmtCode)){
        arr_d=splitDate(d);
        result=arr_d.hh+"时"+arr_d.mm+"分"+arr_d.ss+"秒";
    }
    else{
        console.log("没有匹配的时间格式!");
        return;
    }

    return result;
};

module.exports.chGMT = function (gmtDate) {
    var mydate = new Date(gmtDate);
    mydate.setHours(mydate.getHours() + 8);
    return mydate.format("yyyy-MM-dd hh:mm:ss");
};
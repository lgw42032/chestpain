/**
 * Created by Yun heng on 2017-04-20.
 */
var request = require('request');
var co = require('co');
var config = require('../config/config.json');
exports.getApiUrl = function(){
    return "http://" + config.centerApiHost + ':' + config.centerApiPort;
};
exports.isEmpty = function (data) {
    if (typeof data == "string") {
        if (data == "") {
            return true;
        }
    }
    if (typeof data == 'undefined'  || data == 'undefined'  || data == null || data === undefined) {
        return true;
    }

    if (typeof(data) == 'object' && Object.keys(data).length === 0) {
        return true;
    }
    return false;
};
exports.requestCenterApi = function(data){
    console.log('requestCenterApi',data)
    if(!data.data){
        data.data = null
    }
    var self = this;
    return new Promise(function (resolve, reject){
        co(function* () {
            data.url = self.getApiUrl() + data.url;
            console.log('requestURL:',data.url);
            if(data.method == 'get' || data.method == 'GET'){
                request({method:data.method,uri:data.url,json:true,qs:data.data}, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        console.log('error',err)
                        return reject(err)
                    }else{
                        resolve(body)
                    }
                });
            }else{
                request({method:data.method,uri:data.url,json:true,body:data.data}, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        console.log('error',err)
                        return reject(err)
                    }else{
                        resolve(body)
                    }
                });
            }

        }).catch(function(e){
           console.log('e',e)
                reject(e)

        })
    });

}
exports.requestDbApi = function(data){
    if(!data.data){
        data.data = null
    }
    var self = this;
    return new Promise(function (resolve, reject){

        co(function* () {
            data.url = self.getApiUrl() + data.url;
            request({method:data.method,uri:data.url,json:true,body:data.data}, function optionalCallback(err, httpResponse, body) {
                console.log('body', body)
                if (err) {
                    console.log('error',err)
                    return reject(err)
                }else{
                    resolve(body)
                }
            });
        }).catch(function(e){
            console.log('e',e)
            reject(e)

        })
    });

}
exports.echoSuccess = function(res,msg,data){
    if(!data){
        data = null;
    }
    res.json({
        success:true,
        msg:msg,
        data:data
    })
}
exports.echoError = function(res,msg,data){
    if(!data){
        data = null;
    }
    res.json({
        success:false,
        msg:msg,
        data:data
    })
}



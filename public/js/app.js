/**
 * Created by dell on 2017/12/16.
 */
define(function(require, exports, module) {

//加载jquery, 并把它$设为全局变量
    window.$ = window.jQuery = $ = require('jquery');
    require('pxToRem');
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [ o[this.name] ];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }
//定义一个全局的模块加载函数.module为模块名，options为参数
    exports.script_load = function(module, options) {
        //使用require.async异步加载模块。模块需要提供一个固定的对外调用接口，这里定义为run。
        require.async('../js/' + module, function(module) {
            if (typeof(module.run) === 'function') {
                module.run(options);
            }
        });
    };
    window.script_load = exports.script_load
});

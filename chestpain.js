/**
 * Created by dell on 2018/1/4.
 */

const webServer = require('./utils/webServer');
//const tools = require('./utils/tools');
//var appLog = require('./utils/appLog');
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
    //appLog.logError('uncaughtException'+JSON.stringify(err))
});
process.once('SIGQUIT', function () {
    process.exit(0);
});

process.once('SIGTERM', function () {
    process.exit(0);
});

process.once('SIGINT', function () {
    process.exit(0);
});
//tools.initDefineData();
webServer.startWebServer();


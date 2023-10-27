'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var HookMgr = require('dw/system/HookMgr');

server.extend(module.superModule);

server.append('Show', userLoggedIn.validateLoggedIn, function (req, res, next) {
    var viewData = res.getViewData();
    viewData = {
        message: 'there is a new cartridge KR'
    };

    if (HookMgr.hasHook('app_homework_addViewData')) {
        HookMgr.callHook('app_homework_addViewData', 'addViewData', viewData);
    }

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();

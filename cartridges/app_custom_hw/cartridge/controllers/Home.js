'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var HookMgr = require('dw/system/HookMgr');

server.extend(module.superModule);

server.prepend('Show', userLoggedIn.validateLoggedIn, function (req, res, next) {
    var viewData = res.getViewData();
    viewData.message = 'there is a new cartridge KR';

    if (HookMgr.hasHook('app.homework.addViewData')) {
        HookMgr.callHook('app.homework.addViewData', 'addViewData', viewData);
    }

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();

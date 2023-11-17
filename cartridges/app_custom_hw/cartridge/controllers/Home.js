'use strict';

/**
 * @namespace Home
 */

var server = require('server');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var HookMgr = require('dw/system/HookMgr');
var Resource = require('dw/web/Resource');

server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.message = Resource.msg('label.message.cartridge', 'common', null);

    if (HookMgr.hasHook('app.homework.addViewData')) {
        HookMgr.callHook('app.homework.addViewData', 'addViewData', viewData);
    }

    res.setViewData(viewData);
    return next();
});

server.get('Content', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var guestContent = ContentMgr.getContent('guestContent');
    var loggedContent = ContentMgr.getContent('loggedContent');
    var logged = customer.isAuthenticated();

    if (logged) {
        var firstName = customer.profile.firstName;
    }
    res.render('content/contentAsset', {
        logged: logged,
        guestContent: guestContent,
        loggedContent: loggedContent,
        firstName: firstName
    });

    next();
});

module.exports = server.exports();

'use strict';

/**
 * @namespace Home
 */

var server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData = {
        messege: 'there is a new cartridge KR'
    };
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();

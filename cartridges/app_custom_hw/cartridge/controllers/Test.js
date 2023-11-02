'use strict';

/**
 * @namespace Test
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
/**
* @name Test-Show
 * @function
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */


server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    res.render('test', {
        session: 'Session number:'
    });
    next();
});
module.exports = server.exports();

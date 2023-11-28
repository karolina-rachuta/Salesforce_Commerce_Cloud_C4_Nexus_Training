'use strict';

/**
 * @namespace TroubleDemo
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * Home-Show : This endpoint is called when a shopper navigates to the home page
 * @name Base/Home-Show
 * @function
 * @memberof Home
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
// this data will be cached
server.get('Show', consentTracking.consent, cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    res.render('demo/troubleshooting', {
        welcomeMsg: 'Milo nam Ciebie powitac!'
    });
    next();
}, pageMetaData.computedPageMetaData);

// this data will not be cached
server.get('Include', server.middleware.include, function (req, res, next) {
    var Site = require('dw/system/Site');
    res.render('demo/include', {
        welcomeMsg: 'Milo nam Ciebie powitac!'
    });
    next();
}, pageMetaData.computedPageMetaData);

// witout middleware:
server.get('List', function (req, res, next) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var results = new ProductSearchModel();
    var query = req.httpParameterMap.query;
    results.setSearchPhrase(query);
    results.search();
    res.render('demo/searchResult', {
        query: query,
        results: results,
        format: req.httpParameterMap.format
    });
    next();
}, pageMetaData.computedPageMetaData);

server.get('ShowContent', function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    // cid content id
    var cid = req.httpParameterMap.cid;
    var content = ContentMgr.getContent(cid);
    res.render('demo/contentAssets', {
        content: content,
        cid: cid
    });
    next();
}, pageMetaData.computedPageMetaData);

module.exports = server.exports();

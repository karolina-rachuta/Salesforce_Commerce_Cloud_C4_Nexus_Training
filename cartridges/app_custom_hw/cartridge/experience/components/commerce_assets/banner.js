'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
/**
 * Render logic for the component.
 */
module.exports.render = function (context) {
   var model = new HashMap();
 return new Template('experience/components/commerce_assets/banner').render(model).text;
};

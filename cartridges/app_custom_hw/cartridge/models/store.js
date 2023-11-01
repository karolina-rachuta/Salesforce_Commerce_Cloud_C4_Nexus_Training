'use strict';
var base = module.superModule;

/**
 * @constructor
 * @classdesc The stores model
 * @param {dw.catalog.Store} storeObject - a Store objects
 */

function store(storeObject) {
    base.call(this, storeObject);
    if (storeObject) {
        this.email = storeObject.email;
    }
}

module.exports = store;

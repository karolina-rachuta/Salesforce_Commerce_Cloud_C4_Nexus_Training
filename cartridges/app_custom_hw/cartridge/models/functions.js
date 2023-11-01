'use strict';

// Create a function to get product by a given ID
/**
 * @param {dw/catalog/Product} product
 * @returns {string} product ID
 */
function getProductById(product) {
    return product.getID();
}

// Create a function to get product category by given product
/**
 * @param {dw/catalog/Product} product
 * @returns {collection} category
 */
function getProductCategory(product) {
    return product.getCategories();
}

// Create a function to get different product prices for a given product
/**
 * @param {dw/catalog/Product} product
 * @returns {ProductPriceModel} product prices
 */
function getPricesForProduct(product) {
    return product.getPriceModel();
}

// Create a function to get catalog main categories
/**
 * @param {dw.catalog.Catalog} catalog
 * @returns {collection} main categories
 */
function getCatalogMainCategory(catalogID) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    return CatalogMgr.getCategory(catalogID).getRoot().getSubCategories();
}

// Create a function to get customer by ID
/**
 * @param {dw/catalog/Customer} customer
 * @returns {string} customer ID
 */
function getCustomerID(customer) {
    return customer.getID();
}

// Create a function to check if a given customer is assigned to a given customer group
/**
 * @param {dw/catalog/Customer} customer
 * @param {string} customerGroupID
 * @returns {boolean} true if customer is assigned to the group or false if not
 */
function getAssignedGivenCustomerGroup(customer, customerGroupID) {
    return customer.isMemberOfCustomerGroup(customerGroupID);
}


/**
 * @contructor
 * @param {dw/catalog/Product} product
 */
function FunctionProduct(product) {
    this.ID = getProductById(product);
    this.category = getProductCategory(product);
    this.prices = getPricesForProduct(product);
}

/**
 * @constructor
 * @param {dw/catalog/Category} category
 */
function FunctionCategory(category) {
    this.catalogs = getCatalogMainCategory(category);
}
/**
 * @constructor
 * @param {dw/catalog/Customer} customer
 * @param {string} customerGroupID
 */
function FunctionCustomer(customer, customerGroupID) {
    this.ID = getCustomerID(customer);
    this.customerAsignedToGroup = getAssignedGivenCustomerGroup(customer, customerGroupID);
}
module.export =
{
    FunctionProduct: FunctionProduct,
    FunctionCategory: FunctionCategory,
    FunctionCustomer: FunctionCustomer
};

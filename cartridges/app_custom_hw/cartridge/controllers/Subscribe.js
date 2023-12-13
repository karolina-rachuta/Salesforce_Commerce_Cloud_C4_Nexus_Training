/* global empty */
'use strict';

/**
 * @namespace Subscribe
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Newsletter-Show : The Subscribe-Show endpoint renders the page that allows a user to submit a newsletter.
 * @name Base/Subscribe-Show
 * @function
 * @memberof Newsletter
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
    consentTracking.consent,
    function (req, res, next) {
        var newsletterFormCo = server.forms.getForm('subscribe');
        newsletterFormCo.clear();

        res.render('subscribe', {
            newsletterFormCo: newsletterFormCo
        });

        next();
    }
);

/**
 * Newsletter-Save : The Newsletter-Save endpoint
 * @name Base/Subscribe-Save
 * @function
 * @memberof Newsletter
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_profile_customer_firstname - Input field for the shoppers's first name
 * @param {httpparameter} - dwfrm_profile_customer_lastname - Input field for the shopper's last name
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - dwfrm_profile_customer_email - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_customer_emailconfirm - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_login_password  - Input field for the shopper's password
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post(
    'Save',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require('dw/object/CustomObjectMgr');
        var Resource = require('dw/web/Resource');
        var Transaction = require('dw/system/Transaction');
        var URLUtils = require('dw/web/URLUtils');
        var newsletterFormCo = server.forms.getForm('subscribe');
        var NEWSLETTER_SUB_CO = "NEWSLETTER_SUBSCRIPTION_CO";
        // form validation

        var newsletterResult = CustomObjectMgr.getCustomObject(NEWSLETTER_SUB_CO, newsletterFormCo.email.value);
        if (!empty(newsletterResult)) {
            newsletterFormCo.valid = false;
            newsletterFormCo.email.valid = false;
            newsletterFormCo.email.error = Resource.msg('error.message.not.unique', 'forms', null);
        }
        if (newsletterFormCo.valid) {
            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject(NEWSLETTER_SUB_CO, newsletterFormCo.email.value);
                newsletterEntry.custom.firstName = newsletterFormCo.firstName.value;
                newsletterEntry.custom.lastName = newsletterFormCo.lastName.value;
                newsletterEntry.custom.gender = newsletterFormCo.gender.value;
            });
        }

        res.json({
            success: true,
            redirectUrl: URLUtils.url('Subscribe-Show').toString(),
            email: newsletterFormCo.email.value,
            firstName: newsletterFormCo.firstName.value,
            lastName: newsletterFormCo.lastName.value,
            gender: newsletterFormCo.gender.value
        });

        return next();
    }
);

module.exports = server.exports();

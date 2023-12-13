/* global empty */
'use strict';

/**
 * @namespace Newsletter
 */

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/**
 * Newsletter-Show : The Newsletter-Show endpoint renders the page that allows a user to submit a newsletter.
 * @name Base/Newsletter-Show
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
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('account/newsletter', {
            newsletterForm: newsletterForm
        });

        next();
    }
);

/**
 * Newsletter-Save : The Newsletter-Save endpoint
 * @name Base/Newsletter-Save
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
        var newsletterForm = server.forms.getForm('newsletter');
        var NEWSLETTER_SUB_CO = "NEWSLETTER_SUBSCRIPTION";
        // form validation

        var newsletterResult = CustomObjectMgr.getCustomObject(NEWSLETTER_SUB_CO, newsletterForm.email.value);
        if (!empty(newsletterResult)) {
            newsletterForm.valid = false;
            newsletterForm.email.valid = false;
            newsletterForm.email.error = Resource.msg('error.message.not.unique', 'forms', null);
        }
        if (newsletterForm.valid) {
            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject(NEWSLETTER_SUB_CO, newsletterForm.email.value);
                newsletterEntry.custom.fullName = newsletterForm.fullName.value;
                newsletterEntry.custom.skinType = newsletterForm.skinType.value;
            });
        }

        res.json({
            success: true,
            redirectUrl: URLUtils.url('Newsletter-Show').toString(),
            email: newsletterForm.email.value,
            newsletterResult: newsletterResult,
            newsletterForm: newsletterForm
        });

        return next();
    }
);

module.exports = server.exports();

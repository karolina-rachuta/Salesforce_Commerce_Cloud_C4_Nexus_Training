'use strict';

var server = require('server');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');


server.get('CO', function (req, res, next) {
    var type = 'NEWSLETTER_SUBSCRIPTION_CO';
    var keyValue = 'karolina.rachuta@gmail.com';

    var newsletter = CustomObjectMgr.getCustomObject(type, keyValue);
    var email = newsletter.custom.email;
    var firstName = newsletter.custom.firstName;
    var lastName = newsletter.custom.lastName;
    var gender = newsletter.custom.gender;

    res.json({
        error: false,
        type: type,
        email: email,
        firstName: firstName,
        lastName: lastName,
        gender: gender
    });

    return next();
});


server.get('COs', function (req, res, next) {
    var type = 'NEWSLETTER_SUBSCRIPTION_CO';
    var newsletter = CustomObjectMgr.getAllCustomObjects(type);
    var users = [];
    try {
        while (newsletter.hasNext()) {
            var newsletterObject = newsletter.next();
            var newsletterCustomAttributes = newsletterObject.custom;
            users.push({
                email: newsletterCustomAttributes.email,
                firstName: newsletterCustomAttributes.firstName,
                lastName: newsletterCustomAttributes.lastName,
                gender: newsletterCustomAttributes.gender
            });
        }
    } finally {
        // Always ensure you close the iterator to release system resources
        newsletter.close();
    }

    res.json({
        error: false,
        type: type,
        newsletter: newsletter,
        users: users
    });

    return next();
});

module.exports = server.exports();

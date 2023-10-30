var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var Store = require('*/cartridge/models/store');

server.get('Model', cache.applyDefaultCache, function (req, res, next) {
    var storeEmail = new Store({ email: 'store@email.com' });
    res.json({ email: storeEmail.email });
    next();
});

module.exports = server.exports();

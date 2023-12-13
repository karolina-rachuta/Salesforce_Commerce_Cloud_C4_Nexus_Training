var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Transaction = require('dw/system/Transaction');
//  var {File, FileWriter, XMLStreamWriter} = require('dw/io');

module.exports.execute = function () {
    var subscribeObjectIterator = CustomObjectMgr.getAllCustomObjects('NEWSLETTER_SUBSCRIPTION_CO');
    var csvWriter;
    var file;
    var fileWriter;
    var subscribe;
    try {
        // file = new File([File.IMPEX, 'test', 'test.xml'].join(File.SEPARATOR));
        file = new File([File.IMPEX, 'subscribe.csv'].join(File.SEPARATOR));
        fileWriter = new FileWriter(file);
        csvWriter = new CSVStreamWriter(fileWriter);
        csvWriter.writeNext('Email', 'First Name', 'Last Name', 'Gender');
        while (subscribeObjectIterator.hasNext()) {
            subscribe = subscribeObjectIterator.next();
            csvWriter.writeNext(subscribe.custom.email, subscribe.custom.firstName, subscribe.custom.lastName, subscribe.custom.gender);
            Transaction.wrap(function () {
                CustomObjectMgr.remove(subscribe);
            });
        }
    } catch (e) {

    } finally {
        csvWriter.close();
        fileWriter.close();
    }
};

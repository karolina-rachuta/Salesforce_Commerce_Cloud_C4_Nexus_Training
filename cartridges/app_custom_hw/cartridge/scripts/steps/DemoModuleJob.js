var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var XMLStreamWriter = require('dw/io/XMLStreamWriter');
//  var {File, FileWriter, XMLStreamWriter} = require('dw/io');

module.exports.execute = function () {
    var demoObjectIterator = CustomObjectMgr.getAllCustomObjects('DemoObject');
    var xsw;
    var file;
    var fileWriter;
    try {
        // file = new File([File.IMPEX, 'test', 'test.xml'].join(File.SEPARATOR));
        file = new File([File.IMPEX, 'text.xml'].join(File.SEPARATOR));
        fileWriter = new FileWriter(file);

        xsw = new XMLStreamWriter(fileWriter);

        xsw.writeStartDocument();
        xsw.writeStartElement('products');

        while (demoObjectIterator.hasNext()) {
            var demo = demoObjectIterator.next();
            xsw.writeStartElement('products');
            xsw.writeAttribute('id', demo.custom.product);
            xsw.writeAttribute('name', demo.custom.name);
            xsw.writeEndElement();
        }
        xsw.writeEndElement();
    } catch (e) {

    } finally {
        xsw.close();
        fileWriter.close();
    }
};

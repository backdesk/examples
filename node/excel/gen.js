var Excel = require('exceljs');


module.exports = {
  generate : function (payload, cb) {
    var workbook = new Excel.Workbook();

    workbook.xlsx.readFile('./templates/sample.xlsx')
    .then(function(wb) {
      var ws = wb.getWorksheet(1);

      payload.units.forEach(function (unit) {
        unit = Object.keys(unit).map(function(key) {
          return unit[key]
        });

        ws.addRow(unit);
      });

      return cb(null, wb);
    }, cb);
  }
};

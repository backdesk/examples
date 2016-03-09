// Main dependencies.
var express = require('express')
  , generator = require('./gen');


app = express();

app.use(require('body-parser').json());

app.post('/generate', function (req, res, next) {
  generator.generate(req.body, function (err, workbook) {
    if (err) return next(err);

    res.attachment('sample.xlsx');

    workbook.xlsx.write(res);
  });
});

module.exports = app;

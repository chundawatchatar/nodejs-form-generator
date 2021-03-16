var express = require('express');
var router = express.Router();

var formCore = require('../business-logic/form');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('form/forms', { title: 'Forms', script: 'forms' });
});

router.get('/add-form', function (req, res, next) {
  res.render('form/add-form', { title: 'Add Form', script: 'add-form' });
});

router.get('/add-edit-form/:formName', function (req, res, next) {
  res.render('form/add-edit-form', { title: 'Add Edit ' + req.params.formName, script: 'add-edit-form', formName: req.params.formName});
});

router.get('/get-forms', function (req, res, next) {
  formCore.getForms(req, res, next);
});

router.post('/delete-form', function (req, res, next) {
  formCore.deleteForm(req, res, next);
});

router.post('/add-form', function (req, res, next) {
  formCore.createForm(req, res, next);
});

router.get('/form/:fileName', function (req, res, next) {
  formCore.getForm(req, res, next);
});

router.post('/form/:fileName', function (req, res, next) {
  formCore.saveForm(req, res, next);
});

module.exports = router;

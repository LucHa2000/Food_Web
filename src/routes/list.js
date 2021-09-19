var express = require('express');
var router = express.Router();
const listController = require('../app/controllers/ListController');

router.get('/delete/:id', listController.listDelete);
router.get('/:id', listController.listUpdatePage);
router.patch('/:id/edit', listController.listUpdate);
router.post('/create', listController.create);

module.exports = router;

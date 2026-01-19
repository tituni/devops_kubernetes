var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DevOps with Kubernetes MOOC, step 1.5' });
});

module.exports = router;

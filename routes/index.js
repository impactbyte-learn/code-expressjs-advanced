var express = require('express');
var router = express.Router();

const home = {
  get: (req, res, next) => {
    res.send({
      title: 'Express'
    });
  }
}

router.get('/', home.get);

module.exports = router;
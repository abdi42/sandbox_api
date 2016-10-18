var express = require('express');
var router = express.Router();
var checkMultiRun = require("../middleware/checkMultiRun.js")

router.post('/',checkMultiRun,function(req,res){
  res.send("DONE")
});

module.exports = router;

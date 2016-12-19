var express = require('express');
var router = express.Router();
var checkCustomerInfo = require("../../middleware/checkCustomerInfo.js")
var kue = require('kue');

router.post('/',checkCustomerInfo,function(req,res,next){
  queue = kue.createQueue();

  var job = queue.create('subscribeCustomer', req.body).removeOnComplete(true).save();
  console.log("job created");
  job.on('complete', function(result) {
      console.log(result)
      res.json(result);
  }).on('failed', function(errorMessage) {
      console.log('Job failed');
      console.log(errorMessage)
      next(errorMessage);
  })

});

module.exports = router;

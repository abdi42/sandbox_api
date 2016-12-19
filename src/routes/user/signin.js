var express = require('express');
var router = express.Router();
var kue = require('kue');

router.post('/',function(req,res,next){
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
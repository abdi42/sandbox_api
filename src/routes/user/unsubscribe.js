var express = require('express');
var router = express.Router();
var kue = require('kue'),
queue = kue.createQueue();

router.post('/',function(req,res,next){
  if(!req.body.email){
    var err = new Error("customer email not provided");
    err.status = 400;
    return next(err)
  }

  var job = queue.create('unsubscribeCustomer', {email:req.body.email}).removeOnComplete(true).save();
  console.log("job created")

  job.on('complete', function(result) {
      console.log(result)
      res.json(result)
  }).on('failed', function(errorMessage) {
      console.log('Job failed');
      console.log(errorMessage)
      next(errorMessage)
  })

});

module.exports = router;

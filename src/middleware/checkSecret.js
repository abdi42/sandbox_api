var kue = require('kue');

module.exports = function(req,res,next){
  queue = kue.createQueue();

  var job = queue.create('checkSecret',req.body).removeOnComplete(true).save();
  job.on('complete', function(result) {
      console.log(result)
      next(null)
  }).on('failed', function(errorMessage) {
      console.log('Job Failed');
      next("Invalid Key")
  })
}

var kue = require('kue');

module.exports = function(req,res,next){
  var job = queue.create('checkSecret',req.body).removeOnComplete(true).save();
  console.log('job created');
  job.on('complete', function(result) {
      console.log("Job Finished")
      console.log(result)
      next(null)
  }).on('failed', function(errorMessage) {
      console.log('Job Failed');
      next(errorMessage)
  })
}

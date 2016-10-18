var express = require('express');
var router = express.Router();
var sandbox = require("../api/sandbox.js")
var checkSingleRun = require("../middleware/checkSingleRun.js")
var kue = require('kue');

router.post('/',checkSingleRun,function(){
  queue = kue.createQueue();

  var job = queue.create('singleRun',{
    source:req.body.source,
    input:req.body.input,
    lang:req.body.lang
  }).removeOnComplete(true).save( function(err){
     if( !err ) console.log( job.id );
  });

  job.on('complete', function(result){
    console.log('Job completed with data ', result);

  })

});

module.exports = router;

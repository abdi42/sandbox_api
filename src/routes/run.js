var express = require('express');
var router = express.Router();
var checkSingleRun = require("../middleware/checkSingleRun.js")
var checkSecret = require("../middleware/checkSecret.js");
var kue = require('kue');

router.post('/',checkSecret,checkSingleRun,function(req,res,next){
  queue = kue.createQueue();

 var job = queue.create('singleRun',{
    source:req.body.source,
    input:req.body.input,
    lang:req.body.lang
  }).removeOnComplete(true).save();

  job.on('complete', function(result){
    res.json({
      status:200,
      result:result
    })
  }).on( 'error', function( err ) {
    console.log( 'Oops... ', err );
  });

});

module.exports = router;

var express = require('express');
var router = express.Router();
var userSchema = require("../models/user.js");

router.post('/',function(req,res,next){
  checkObject(req.body,['email','username','password'],function(err){
    if(err) return next(err);

    userSchema.findOne({email:req.body.email},function(err,user){
      if(user){
        var err = new Error("user already exists")
        err.status = 400;
        return next(err);
      }

      var user = new userSchema({
        email:req.body.email,
        username:req.body.username
      })

      user.setPassword(req.body.password);
      user.save(function(err){
        if(err) return next(err);

        res.json(user)
      })

    })

  })
});

function checkObject(obj,expectedKeys,callback){
  for(var i=0;i<expectedKeys.length;i++){
    var key = expectedKeys[i]
    if(!obj[key]){
      var err = new Error(key + " not provided")
      err.status = 400;
      return callback(err);
    }
  }
}

module.exports = router;

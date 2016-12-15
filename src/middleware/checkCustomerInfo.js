module.exports = function(req,res,next){
  if(!req.body.plan){
    var err = new Error("subscription plan not provided");
    err.status = 400;
    return next(err);
  }

  if(!req.body.source){
    var err = new Error("customer source not provided");
    err.status = 400;
    return next(err)
  }

  if(!req.body.email){
    var err = new Error("customer email not provided")
    err.status = 400;
    return next(err);
  }

  return next();
}

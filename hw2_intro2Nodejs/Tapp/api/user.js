var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');

var User = mongoose.model("User", {
  _id: String,
  //password: String,
  username: String,
  age: String
});

var listUser = function(req, res, next){
  User.find({ })
  .select('-age')
  .exec(function(err, users){
    if(!err){
      res.json(200,users);
      console.log(users);
      return;
    }
    else{
      res.json(500,{});
      return;
    }
  });
};

exports.listUser = listUser;
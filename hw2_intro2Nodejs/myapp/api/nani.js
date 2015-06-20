var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test')

var hahaha = mongoose.model("uSEr", {
	_id: String,
	password: String,
	username: String,
	age: String
});

var nan = function(req, res, next){
	hahaha.find({})
	.select('-age')
	.exec(function(err, users){
		if (!err){
			res.json(200, users);
			console.log(users);
			return;
		}
		else{
			res.json(500, {});
			return;
		}
	});
};

exports.nan = nan;
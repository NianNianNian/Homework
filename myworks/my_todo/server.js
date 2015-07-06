var express = require ( 'express' )
var app = express ()
var mongoose = require ( 'mongoose' );

//connect to the database
mongoose.connect('mongodb://localhost:27017/My_todo');

//configuration
app.configure(function(){
	//find the static files
	app.use(express.static(_dirname + '/public'));
	//Dispays a log of all request on the console
	app.use(express.logger('dev'))
	//change the HTML POST method
	app.use(express.bodyParser());
	//Simulates DELETE and PUT
	app.use(express.methodOverride());
});

//LIsten on port 8080 and the server runs
app.listen(8080,function(){
	console.log('app listening on port 8080');
});



//Definition MOdel
var all = mongoose.model('All', {
text: String
});


//routes of our api
//get all todos
app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if(err) {res.send(err)};
		res.json(todos);
	})
});


//post that create and returns all behind all creation
app.post('/api/todos', function(req,res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err,todo){
		if(err) {res.send(err);}
	Todo.find(function(err, todos) {
		if(err){res.send(err);}
		res.json(todos);
	});
});
});

//delet a specific and returns all after removing everything
app.delete('/api/todos/:todo', function(req,res) {
	Todo.remove({
		_id: req.params.todo
	}, function(err,todo) {
		if(err){res.send(err);}
		Todo.find(function(err, todos) {
			if(err){res.send(err);}
			res.json(todos);});
	})
});



//loads a simple HTML view where will our Single Page App
//angular'll drive the frontend
app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

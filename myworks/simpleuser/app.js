var connect = require('connect');

var http = require('http');
    users = require('./users');

var app = connect();

var server = connect(
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret:"my app secret"}),
    function(req, res, next){
	if('/'==req.url&&req.session.logger_in){
		res.writeHead(200,{'Content-Type':'text.tml'});
		res.end('Welcome back <b>' + reqsession.name+'<b/>.' + '<a href=".logout">logout</a>');
	}else{
		next();}
	}
    ,function(req, res, next){
	if('/'==req.url&&'GET'==req.method){
		res.writeHead(200,{'Content-Type':'text/html'});
		res.end([
            '<form action="/login" method="post">' + 
            '<fieldset>' + 
            '<legend>Please login</legend>' +
            '<p>password:<input type="password" name="password"></p>' + 
            '<button>Submit</button>' + 
            '</fieldset>' + 
            '</form>'].join(''));
	}else{next();}}
    ,function(req,res,next){
        if(req.url=='/login'&&req.method.toLowerCase()){
            res.writeHead(200);
            if(!users[req.body.user]||req.body.password!=users[req.body.user].password){
                res.end("username/pwd error");
            }else{
                req.session.logged_in=true;
                req.session.name=users[req.body.user].name;
                res.end("Authenticated");
            }
        }else{
            next();
        }
    }
    ,function(req,res,next){
        if('/logout'==req.url&&req.session.logged_in){
            req.session.logged_in=false;
            res.writeHead(200);
            res.end("logout");
        }else{
            res.writeHead(302,{
                'location':'/'
            })
            res.end()
        }
    }
);
server.listen(3000)

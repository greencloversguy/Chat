var app = require('express')();
var http = require('https').Server(app);
var io = require('socket.io')(http);
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'
 

app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg);
		io.emit('chat message', msg);
		
	});
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
  console.log( http )
});

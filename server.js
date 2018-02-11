let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('index');
})

let server = app.listen(8000);
let io = require("socket.io").listen(server);
io.sockets.on('connection', function (socket) {
    socket.on("submit", function (data) {
        console.log(data);
        data['num'] = Math.floor(Math.random() * 1001);
        socket.emit('server', data);
    })
})
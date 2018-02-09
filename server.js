let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let session = require('express-session');

let app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.render('index');
})

app.post('/form', function(req,res){
    console.log(req.body);
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comments = req.body.comments;
    res.redirect('/result')
})

app.get('/result',function(req,res){
    res.render('result', {name:req.session.name, location:req.session.location, language:req.session.language, comments:req.session.comments })
})

app.listen(8000)
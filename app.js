const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const handlebars=require('express-handlebars');
const app=express();

const urlencodeParser=bodyParser.urlencoded({extended:false});



const sql=mysql.createConnection({
		host:'localhost',
		user:'root',		
		Password:'',		
		database: 'nodejs'

		});

app.use('/img',express.static('img'));
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
		
//template

app.engine('handlebars',handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

// route

app.get("/",function(req,res){res.render('home');});
app.get("/javascript",function(req,res){res.sendfile(__dirname+'/js/javascript.js');});
app.get("/style",function(req,res){res.sendfile(__dirname+'/css/style.css');});

app.get("/inserir",function(req,res){
	res.render('inserir');
});


app.get("/select/:id?",function(req,res){
		if(!req.params.id){
			
			sql.query("select * from user order by id ASC",function(err,results,fields){
			res.render('select',{data:results});
			
			});
		}else{sql.query("select * from user where id=? order by id ASC",[req.params.id],function(err,results,fields){
			res.render('select',{data:results});
			
			});
		}

});
app.post("/controllerForm",urlencodeParser,function(req,res){
	sql.query("insert into user values (?,?,?)",[req.body.id,req.body.name,req.body.age]);	
	res.render('controllerForm');
});
//deletar

app.get('/deletar/:id',function(req,res){
	sql.query('delete from user where id=?',[req.params.id]);
	res.render('deletar');
	});

//update

app.get('/update/:id?',function(req,res){
	sql.query('select * from user where id=?',[req.params.id],function(err,results,fields){
	res.render('update',{id:req.params.id,name:results[0].name,age:results[0].age});
	});
});

app.post('/controllerUpdate',urlencodeParser,function(req,res){
	sql.query('update user set name=?, age=? where id=?',[req.body.name,req.body.age,req.body.id]);	
	res.render('controllerUpdate');
});

//start server
app.listen(3000,function(req,res){console.log('servidor iniciado - em operação');});
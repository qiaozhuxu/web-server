var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var todos = [];
var todoNextID = 1;

app.use(bodyParser.json());
app.get('/',function(req,res){
	res.send("Todo API Root");
});
app.get('/todos',function(req,res){
	res.json(todos);
});
app.get('/todos/:id',function(req,res){
	var todoID = parseInt(req.params.id,10);


	for(var i = 0; i < todos.length;i++){
		if(todoID === todos[i].id){
			res.json(todos[i]);
		}else{
			res.status(404).send("your request not found");
		}
	}
	// var todoID = parseInt(req.params.id, 10);
	// var matchedTodo;

	// todos.forEach(function(todo){
	// 	if(todoID === todo.id){
	// 		matchedTodo = todo;
	// 	}
	// });
	// if(matchedTodo){
	// 	res.json(matchedTodo);
	// }else{
	// 	res.status(404).send();
	// }
});

app.post('/todos',function(req,res){
	var body = req.body;
	body.id = todoNextID++;
	todos.push(body);
	res.json(body);

});

app.listen(PORT,function(){
	console.log("Express listen on PORT" + PORT);
});

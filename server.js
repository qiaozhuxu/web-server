var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');

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
	var matchedTodo = _.findWhere(todos,{id: todoID});

	// for(var i = 0; i < todos.length;i++){
	// 	if(todoID === todos[i].id){
	// 		res.json(todos[i]);
	// 	}else{
	// 		res.status(404).send("your request not found");
	// 	}
	// }
	// var todoID = parseInt(req.params.id, 10);
	// var matchedTodo;

	// todos.forEach(function(todo){
	// 	if(todoID === todo.id){
	// 		matchedTodo = todo;
	// 	}
	// });
	if(matchedTodo){
		res.json(matchedTodo);
	}else{
		res.status(404).send();
	}
});

app.post('/todos',function(req,res){
	var body = _.pick(req.body,"description","completed");

	if(! _.isBoolean(body.completed) || ! _.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();

	body.id = todoNextID++;
	todos.push(body);
	res.json(body);

});

app.delete('/todos/:id',function(req,res){
	var todoID = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos,{id:todoID});
	if(matchedTodo){
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);
		// res.status(200).json(todos);//why
	}else{
		res.status(404).json({"error":"the id does not exist"});
	}
	
});
app.listen(PORT,function(){
	console.log("Express listen on PORT" + PORT);
});

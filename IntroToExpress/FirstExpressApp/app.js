var express = require("express");
var app = express();

app.get('/',function(req,res){
    res.send("Hello I'm Bhupendra");
});
app.get('/r/:redditName/comments/:id/:title',function(req,res){
    var reddit = req.params.redditName;
    var id = req.params.id;
    var title = req.params.title;
    res.send("you are searching " + reddit.toUpperCase() + " Reddit and " + id.toUpperCase() + " Id and title is " + title.toUpperCase());
});
app.get('/Dogs',function(req,res){
    res.send("Bull dog");
});
app.get('/bye',function(req,res){
    res.send("Good bye");
});
app.get('*',function(req, res) {
   res.send("You are requesting which are inconsistent"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is started");
});
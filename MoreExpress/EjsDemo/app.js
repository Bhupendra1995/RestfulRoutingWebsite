var express = require("express");
var app  = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",function(req,res){
   res.render("home"); 
});
app.get("/fallloveinwith/:thing",function(req,res){
    var thing =req.params.thing;
   res.render("love",{thingvar : thing}); 
});
app.get("/posts",function(req, res) {
    var posts = [
        {title : "the mimi book" , author: "colt" },
        {title : "the dog chice" , author: "charlie" },
        {title : "the pat choice" , author: "russel" }
       ];
       res.render("post",{posts : posts});
});
 
app.listen(process.env.PORT,process.env.IP,function(){
   console.log("Server is started"); 
});
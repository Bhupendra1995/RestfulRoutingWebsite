var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended : true}));

app.set("view engine", "ejs");
var friends = ["colt" ,"hari" ,"ram" ,"raveesh", "vivek" ,"saurabh"];

app.get("/",function(req,res){
   res.render("home"); 
});
app.get("/friends",function(req,res){
   res.render("friends",{friends : friends});
});
app.post("/addfriend",function(req,res){
    var newfriend = req.body.newfriend;
    friends.push(newfriend);
   res.redirect("/friends");
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("server is started"); 
});
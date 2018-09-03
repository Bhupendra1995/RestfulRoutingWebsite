var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine", "ejs");
   var campgrounds = [
       {name:"colt" , image:"https://media-cdn.tripadvisor.com/media/photo-s/01/d9/bc/da/cougar-rock-campground.jpg"},
       {name:"steel" , image:"https://media-cdn.tripadvisor.com/media/photo-s/02/39/65/86/camp-at-maple-creek.jpg"},
       {name:"harry" , image:"https://www.campsitephotos.com/photo/camp/44422/Cougar_Rock_D004.jpg"}
   ] ;

app.get("/",function(req,res){
   res.render("landing"); 
});

app.get("/campground",function(req,res){
   res.render("campground",{data:campgrounds});
});

app.post("/campground",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var newCampground = {name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campground");
});

app.get("/campground/new",function(req, res) {
   res.render("new");
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The Yelpcamp server is started"); 
});
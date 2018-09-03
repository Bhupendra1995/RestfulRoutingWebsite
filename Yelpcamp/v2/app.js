var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var campgroundsSchema = new mongoose.Schema({
   name: String,
   image: String,
   description : String
});

var campgrounds = mongoose.model("campgrounds",campgroundsSchema);

// campgrounds.create({
//          name:"steel" , 
//          image:"https://media-cdn.tripadvisor.com/media/photo-s/02/39/65/86/camp-at-maple-creek.jpg",
//          description:"This is new capmground image"
// },function(err,campground){
//   if(err){
//       console.log(err);
//   } else{
//       console.log("new campground is added");
//       console.log(campground);
//   }
// });
app.get("/",function(req,res){
   res.render("landing"); 
});


app.get("/campground",function(req,res){
    campgrounds.find({},function(err,campgrounds){
        if(err){
           console.log(err);
       } else{
            res.render("index",{data:campgrounds});
       }
    })
});

app.post("/campground",function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground = {name:name,image:image,description:desc};
    campgrounds.create(newCampground,function(err,newCreate){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campground");
        }
    })
});

app.get("/campground/new",function(req, res) {
   res.render("new");
});

app.get("/campground/:id",function(req, res) {
    campgrounds.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campgrounds:foundCampground});
        }
    })
});

app.listen(process.env.PORT,process.env.IP,function(){
   console.log("The Yelpcamp server is started"); 
});
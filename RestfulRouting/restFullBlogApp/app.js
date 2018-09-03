var express   = require("express"),
app           = express(),
bodyParser    = require("body-parser"),
mongoose      = require("mongoose"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override");

//Conecting

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//MONGOOSE SCHEMA
var blogSchema = new mongoose.Schema({
    title : String,
    image : String,
    body : String,
    created : { type : Date, default:Date.now}
});
var Blog = mongoose.model("Blog",blogSchema);
// Blog.create({
//   title : "the Reset full routes",
//   image : "https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=272dda12b7480a098e1320036ac49966&auto=format&fit=crop&w=500&q=60",
//   body : "thise osdldsld"
// });
app.get("/",function(req,res){
    res.redirect("/blogs");
});

// INDEX ROUTE 
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});

//NEW ROUTE
app.get("/blogs/new",function(req, res) {
   res.render("new"); 
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog,function(err,Newblog){
       if(err){
           console.log(err);
       }else{
           res.redirect("/blogs");
       }
   });
});

//SHOW ROUTE
app.get("/blogs/:id",function(req, res) {
   Blog.findById(req.params.id,function(err,ShowBlog){
       if(err){
           res.redirect("/blogs");
       }else{
           res.render("show",{blog: ShowBlog});
       }
   });
});

//EDIT ROUTE
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,EditBlog){
       if(err){
           res.redirect("/blogs");
       } else{
          res.render("edit",{blog:EditBlog}); 
       }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
     Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
         if(err){
             res.redirect("/blogs");
         }else{
             res.redirect("/blogs/" + req.params.id);
         }
     });
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is started");
});


var express = require("express");

var app = express();

app.get("/",function(req,res){
   res.send("HI welcome to my assignment"); 
});

app.get("/speak/:animal",function(req,res){
    var sounds ={
        pig : "Oink",
        cat : "Meow",
        dog : "Woof woof!",
        cow : "Moo"
    }
    
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says "+sound);
    // if(animal === 'pig'){
    //     res.send("The " + animal + " says Oink!");
    // }else if (animal === 'cat'){
    //     res.send("The " + animal + " says Mooo!");
    // }else if (animal === 'dog'){
    //     res.send("The " + animal + " says Woof Woof!");
    // }else{
    //     res.send("The " + animal + " says Blah");
    // }
});
app.get('/repeat/:task/:no',function(req, res) {
    var task = req.params.task;
    var no = req.params.no;
    var str = "";
    for (var i=0; i<no;i++){
        
        str+=task;
        str+=" ";
        
    }
    res.send(str);
});
app.get("*",function(req, res) {
   res.send("Soory.... Page Not Found"); 
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is started");
});

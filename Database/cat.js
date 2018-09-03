var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temparament : String
});

var Cat = mongoose.model("Cat",catSchema);
Cat.create({
    name:"dolly",
    age: 12,
    temparament: "good"
},function(err,cat){
    if(err){
        console.log(err);
    }else{
        console.log("New cat ");
        console.log(cat);
    }
});

// var kitty = new Cat({
//   name: "Goochy",
//   age:11,
//   temparament:"bleedy"
// });

// kitty.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     }else{
//         console.log("Cat is Succesfully added in DB");
//         console.log(cat);
//     }
// });



Cat.find({},function(err,cats){
    if(err){
        console.log("OH !NO some thing wrong");
        console.log(err);
    }else{
        console.log("All cats are .....");
        console.log(cats);
    }
});
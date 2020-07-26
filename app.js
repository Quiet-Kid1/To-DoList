const express = require('express');
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

const newLists = ["Buy Food", "Cook", "Study"];
const workItem = [];

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function(req, res){

   const day = date.getDate();
    
    res.render("list", {ListTitle: day, newListItem: newLists});
})

app.post("/", function(req, res){

   
    newList = (req.body.newList);

    if (req.body.button == "Work"){
        workItem.push(newList);
        res.redirect("/work");
    }else{
        newLists.push(newList);
        res.redirect("/")
    }

    
});

app.get("/work", function(req, res){
    res.render("list", {ListTitle: "Work List", newListItem: workItem});
});

app.get("/about", function(req, res){
    res.render("about");
})


app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
})
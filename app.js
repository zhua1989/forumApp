//dependencies
var express = require("express");
var app = express();
var fs = require("fs");
var ejs = require("ejs");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('topics.db');


//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({
    extended: false
});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));




app.listen(9000,function(){
    console.log("Running on over 9000")
})


app.get("/", function(req,res){
  var template = fs.readFileSync('./views/index.html','utf8')
  db.all("SELECT * FROM categories",function(err,rows){
    if (err){
      console.log(err)
    } else {
    var rendered = ejs.render(template,{rows:rows})
    res.send(rendered)
    }
  })
})


app.get("/categories/:cat_id/", function(req,res){
  var template = fs.readFileSync("./views/show_threads.html","UTF8")
  console.log(req.params)
  db.all("SELECT * FROM threads INNER JOIN categories ON categories.id = threads.category_id WHERE category_id=?",req.params.cat_id, function(err,rows){
    if (err){
      console.log(err)
    } else {
      console.log(rows)
      console.log(typeof rows)
      var rendered = ejs.render(template, {rows:rows})
      res.send(rendered)
    }

  })
})

app.get("/categories/:cat_id/threads/:thread_id/", function(req,res){
  var template = fs.readFileSync("./views/show_comments.html","UTF8")
  console.log(req.params)
  db.all("SELECT user,message,votes FROM threads INNER JOIN comments ON comments.thread_id = threads.id WHERE thread_id=?",req.params.thread_id, function(err,rows){
    if (err){
      console.log(err)
    } else {
      console.log(rows)
      var threadObjs = rows;
      db.all("SELECT author,comment FROM threads INNER JOIN comments ON comments.thread_id = threads.id WHERE thread_id=?",req.params.thread_id, function(err,rows){
        if (err) {
          console.log(err)
        } else {
          console.log(rows)
          var commentObjs = rows;
          var rendered = ejs.render(template, {threadObjs:threadObjs, commentObjs:commentObjs})
          res.send(rendered)
        }
      })
      // var rendered = ejs.render(template, {rows:rows})
      // res.send(rendered)
    }

  })
})











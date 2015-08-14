//dependencies
var express = require("express");
var app = express();
var fs = require("fs");
var ejs = require("ejs");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('topics.db');
var request = require('request');


//middleware
var bodyParser = require('body-parser');
var urlencodedBodyParser = bodyParser.urlencoded({
    extended: false
});
app.use(urlencodedBodyParser);
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static('public'));




app.listen(9000, function() {
    console.log("Running on over 9000")
})

//Get Request to render Home Page
app.get("/", function(req, res) {
    var template = fs.readFileSync('./views/index.html', 'utf8')
    db.all("SELECT * FROM categories", function(err, rows) {
        if (err) {
            console.log(err)
        } else {
            var rendered = ejs.render(template, {
                rows: rows
            })
            res.send(rendered)
        }
    })
})

//Get Request to render a page of Threads in a category
app.get("/categories/:cat_id/threads/", function(req, res) {
    var template = fs.readFileSync("./views/show_threads.html", "UTF8")
    console.log(req.params)


            db.all("SELECT threads.id, threads.message, threads.user, threads.category_id,threads.votes FROM threads INNER JOIN categories ON categories.id = threads.category_id WHERE category_id=? ORDER BY votes DESC", req.params.cat_id, function(err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(rows)
                    var arrayTwo = rows;
                    var rendered = ejs.render(template, {
                        arrayTwo: arrayTwo
                    })
                    res.send(rendered)
                }
            })
        

    
})


//Get request to render comments within a thread page
app.get("/categories/:cat_id/threads/:thread_id/", function(req, res) {
    var template = fs.readFileSync("./views/show_comments.html", "UTF8")
    console.log(req.params)
    db.all("SELECT user,message,votes FROM threads WHERE threads.id=?", req.params.thread_id, function(err, rows) {
        if (err) {
            console.log(err)
        } else {
            console.log(rows[0])
            var threadObjs = rows;
            console.log(threadObjs)
            db.all("SELECT comments.author,comments.comment,comments.id,comments.thread_id,comments.geo_city,comments.geo_state FROM threads INNER JOIN comments ON comments.thread_id = threads.id WHERE thread_id=?", req.params.thread_id, function(err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(rows)
                    var commentObjs = rows;
                    var rendered = ejs.render(template, {
                        threadObjs: threadObjs,
                        commentObjs: commentObjs,
                        cat_id: req.params.cat_id,
                        thread_id: req.params.thread_id
                    })
                    res.send(rendered)
                }
            })

        }

    })
})

//Get to render new form to add comment
app.get("/categories/:cat_id/threads/:thread_id/comments/new/", function(req, res) {
    var newForm = fs.readFileSync("./views/new_comments.html", "UTF8")
    db.all("SELECT threads.id,threads.user FROM threads ")
    console.log(req.params.cat_id)
    var rendered = ejs.render(newForm, {
        cat_id: req.params.cat_id,
        thread_id: req.params.thread_id
    })
    res.send(rendered)
})

app.post("/categories/:cat_id/threads/:thread_id/comments", function(req, res) {
    console.log(req.body)

    request.get('http://ipinfo.io/geo/', function(err, response, body) {
        var geoLocation = JSON.parse(body)
        console.log(geoLocation)
    db.run("INSERT INTO comments (author,comment,thread_id,geo_city,geo_state) VALUES(?,?,?,?,?)", req.body.author, req.body.comment, req.body.thread_id, geoLocation.city, geoLocation.region, function(err) {
        if (err) {
            console.log(err)
        }
        var idOfLastInsert = this.lastID;
        console.log(idOfLastInsert)
        res.redirect("/categories/" + req.params.cat_id + "/threads/" + req.params.thread_id)

    })
    })
})


//Get Request to render a form to add a new thread
app.get("/threads/new", function(req, res) {
    var newForm = fs.readFileSync("./views/new_thread.html", "UTF8")
    res.send(newForm)
})

//Post request that adds it to the database and redirects to home page
app.post("/categories/:cat_id/threads", function(req, res) {
    console.log(req.body)
    db.run("INSERT INTO threads (user,message,category_id,votes) VALUES(?,?,?,?)", req.body.user, req.body.message, parseInt(req.body.category_id), parseInt(req.body.votes), function(err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/categories/" + req.body.category_id + "/threads/")
        }
    })

})



//Put request to add a vote for a thread
app.put("/categories/:cat_id/threads/:thread_id", function(req, res) {
    console.log(req.body)
    db.run("UPDATE threads SET votes = ?  WHERE id= ? ", parseInt(req.body.current_vote) + parseInt(req.body.increase_vote), req.body.id, function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('hi')
            res.redirect("/categories/" + req.params.cat_id + "/threads/")
        }
    });


})



app.delete("/categories/:cat_id/threads/:thread_id/comments/:comment_id", function(req, res) {
    console.log(req.params)
    db.run("DELETE FROM comments WHERE comments.id=?", req.params.comment_id, function(err) {
        if (err) {
            console.log(err)
        }
        res.redirect("/categories/:cat_id/threads/:thread_id/")
    })
})

app.delete("/categories/:cat_id/threads/:thread_id/", function(req, res) {
    console.log(req.params)
    db.run("DELETE FROM threads WHERE threads.id=?", req.params.thread_id, function(err) {
        if (err) {
            console.log(err)
        }
        res.redirect("/categories/:cat_id/")
    })
})

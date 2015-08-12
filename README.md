#ReadMe

##User Stories
- A user goes to homepage and sees a list of posts ordered by popularity
- There is a link a user can click on the homepage to create a new Topic
- This brings them to a form page to fill out Post Information
- They will be text inputs.  Once they submit a topic they will be redirected to Homepage where it lists all the topoics
- If they click on the topic they can see a list of the comments
- On that page someone can click a link that brings them to a page to add a new comment
- A user will be able to click a vote button which will give the topic another vote
- They can't vote more than once


## Feature Specs
- Technologies to be used: JS, Node, SQLITE3, SQL
- Will have forms to create a new Topic and another to create comments
- User can edit a topic
- User will not be able to delete comment
- User can delete a Topic


## SQL Table Setup
CREATE TABLE topics (
    id integer PRIMARY KEY autoincrement,
    author text NOT NULL,
    category text NOT NULL,
    message text NOT NULL,
    votes integer
);


CREATE TABLE comments (
    id integer PRIMARY KEY autoincrement,
    author text NOT NULL,
    comment text NOT NULL,
    topic_id,
    FOREIGN KEY(topic_id) REFERENCES topics(id)
);


## Routes
- app.get('/') Get Request Index page
- app.get('/topics/new') Get Request for New Topic form
- app.get('/topics/:topicID') Get Request to Render Topic and comments
- app.post('/topics') Post Request when adding a new Topic
- app.get('/topics/:topicID/Comments/New')Get request render new comment form
- app.post('/topics/:topicID/comments') Post request to add a comment
- app.delete("/topics/:topicID") Delete Request to add a comment
-app.put("/topics/:topicID/comments/:commentID") Put request to edit a comment



##WIREFRAMES
![./IMG_0441.JPG](./IMG_0441.JPG)

##PseudoCode
- Set up App.Listen on popularity
- Set up dependencies and install modules
- Set up Get Request to render Home Page
- Set up Get Request to render Topics Page for category
- Set up Get Request to render new Topics form
- Set up post Request for new Topic
- Set up Get Request to render Delete Requests
- Set up get Request to render new Comments form
- Set up post Request for new comments
- Set up Put request to edit Comments

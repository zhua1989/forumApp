CREATE TABLE categories (
      id integer PRIMARY KEY autoincrement,
      name varchar(255) NOT NULL
);


CREATE TABLE threads (
    id integer PRIMARY KEY autoincrement,
    user varchar(255) NOT NULL,
    message varchar(255) NOT NULL,
    votes integer,
    category_id integer NOT NULL,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);


CREATE TABLE comments (
    id integer PRIMARY KEY autoincrement,
    author varchar(255) NOT NULL,
    comment varchar(255) NOT NULL,
    thread_id integer NOT NULL, 
    FOREIGN KEY(thread_id) REFERENCES threads(id)
);

INSERT INTO categories(name) VALUES('Botany');
INSERT INTO categories(name) VALUES('Entertainment');
INSERT INTO categories(name) VALUES('Sports');
INSERT INTO categories(name) VALUES('Food');
INSERT INTO categories(name) VALUES('world_news');
INSERT INTO categories(name) VALUES('Gaming');
INSERT INTO categories(name) VALUES('mens_health');
INSERT INTO categories(name) VALUES('mysteries');

INSERT INTO threads (user,message,votes,category_id) VALUES ('antman89','What are your thoughts on Bonsai trees?',2,1);
INSERT INTO threads (user,message,votes,category_id) VALUES ('jackipottsdam22','OMG Ryan Adams is covering 1989!',3,2);
INSERT INTO threads (user,message,votes,category_id) VALUES ('Taylor','Roger Goodel is an idiot. Tom Brady is a Saint',1,3);
INSERT INTO threads (user,message,votes,category_id) VALUES ('fatSal','My Mom says i need to stop eating Meatballs.  What are good healthy recipes?',4,4);
INSERT INTO threads (user,message,votes,category_id) VALUES ('InformedAmerican99','Russia threatening to block Reddit',2,5);
INSERT INTO threads (user,message,votes,category_id) VALUES ('noobPwner','People that steal goals in rocket league suck',5,6);
INSERT INTO threads (user,message,votes,category_id) VALUES ('antman89','Eating Paleo and doing crossfit is the best combo',1,7);
INSERT INTO threads (user,message,votes,category_id) VALUES ('jackipottsdam22','Is the mystery of MH370 close to being solved?',4,8);


INSERT INTO comments (author,comment,thread_id) VALUES ('trollMan89','BONSAI TREES SUCK', 1);
INSERT INTO comments (author,comment,thread_id) VALUES ('Tony','Im a swiftie but I DO love Ryan Adams', 2);
INSERT INTO comments (author,comment,thread_id) VALUES ('nysportsfan89','cheaters will be cheaters', 3);
INSERT INTO comments (author,comment,thread_id) VALUES ('Anthony','Lemon Rosemary Grilled Chicken With Asparagus', 4);
INSERT INTO comments (author,comment,thread_id) VALUES ('leftwingnut','WAAAAAAAAAT', 5);
INSERT INTO comments (author,comment,thread_id) VALUES ('gamernut65','Hey as long as my team wins', 6);
INSERT INTO comments (author,comment,thread_id) VALUES ('Felix','I think carbs are good for you', 7);
INSERT INTO comments (author,comment,thread_id) VALUES ('dude','who knows man theyre watching us', 8);

INSERT INTO comments (author,comment,thread_id) VALUES ('swiftie22','THIS BAR WOULDN"T PLAY T SWIFT THE OTHER NIGHT', 2);
INSERT INTO comments (author,comment,thread_id) VALUES ('musicGeek','Ryan Adams is a class Act', 2);











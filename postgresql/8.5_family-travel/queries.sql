CREATE TABLE student (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT
);

-- One to One --
CREATE TABLE contact_detail (
  id INTEGER REFERENCES student(id) UNIQUE,
  tel TEXT,
  address TEXT
);

-- Data --
INSERT INTO student (first_name, last_name)
VALUES ('izumi', 'miyamura');
INSERT INTO contact_detail (id, tel, address)
VALUES (1, +9190843273, 'front of the screen');

-- Join -- (INNER JOIN) One to One --
SELECT * -- select all from 
FROM student -- student table and 
JOIN contact_detail -- table with it, 
ON student.id = contact_detail.id -- this criteria 

-- a single student has many homeworks to do, i.e student to homework is
-- Many to One --
CREATE TABLE homework_submission (
  id SERIAL PRIMARY KEY,
  mark INTEGER,
  student_id INTEGER REFERENCES student(id)
);

-- Data --
INSERT INTO homework_submission (mark, student_id)
VALUES (98, 1), (89, 1), (88, 1)

-- Join --
SELECT * 
FROM student 
JOIN homework_submission
ON student.id = homework_submission.student_id

SELECT student.id, first_name, last_name, mark
FROM student
JOIN homework_submission
ON student.id = homework_submission.student_id


-- if you have 2 one to many relationships, one from each side of the table, then what you get overall is a many to many relationship
-- Many to Many --
CREATE TABLE class (
  id SERIAL PRIMARY KEY,
  title VARCHAR(45)
);

CREATE TABLE enrollment (
  student_id INTEGER REFERENCES student(id), -- (foreign key) references the student table
  class_id INTEGER REFERENCES class(id), -- references the class table
  PRIMARY KEY (student_id, class_id) -- combination of the two ids 
);

-- Data --
INSERT INTO student (first_name, last_name)
VALUES ('izuku', 'midoriya');

INSERT INTO class (title)
VALUES ('English Literature'), ('Maths'), ('Physics');

INSERT INTO enrollment (student_id, class_id ) 
VALUES (1, 1), (1, 2);
INSERT INTO enrollment (student_id ,class_id) 
VALUES (2, 2), (2, 3);

-- Join --
SELECT * --everything
FROM enrollment --and 
JOIN student ON student.id = enrollment.student_id --and
JOIN class ON class.id = enrollment.class_id;

SELECT student.id AS id, first_name, last_name, title
FROM enrollment 
JOIN student ON student.id = enrollment.student_id
JOIN class ON class.id = enrollment.class_id;

-- ALIAS --
SELECT s.id AS id, first_name, last_name, title
FROM enrollment AS e
JOIN student AS s ON s.id = e.student_id
JOIN class AS c ON c.id = e.class_id;


SELECT s.id AS id, first_name, last_name, title
FROM enrollment e
JOIN student s ON s.id = e.student_id
JOIN class c ON c.id = e.class_id;

-- for the family travel tracker, commands used:

DROP TABLE IF EXISTS visited_countries, users;

CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(15) UNIQUE NOT NULL,
color VARCHAR(15)
);

CREATE TABLE visited_countries(
id SERIAL PRIMARY KEY,
country_code CHAR(2) NOT NULL,
user_id INTEGER REFERENCES users(id)
);

-- AND THE ID FROM USERS IS CONNECTE TO THE USER_ID IN VISITED_COUNTRIES

INSERT INTO users (name, color)
VALUES ('Angela', 'teal'), ('Jack', 'powderblue');

INSERT INTO visited_countries (country_code, user_id)
VALUES ('FR', 1), ('GB', 1), ('CA', 2), ('FR', 2 );

SELECT *
FROM visited_countries
JOIN users
ON users.id = user_id;

-- ALTER TABLE COMMANDS:

ALTER TABLE student
  RENAME TO user;

ALTER TABLE user
  ALTER COLUMN fitsrt_name TYPE VARCHAR(20);

ALTER TABLE contact_detail
  ADD email TEXT  


-- this can be used, like if the user has already been to a place, it must alredy be in the database, so when its entered by the user again, we can generate an error, we can send a message back to the server.

ALTER TABLE visited_countries
  ADD UNIQUE (user_id, country_code)

-- updating the columns of the tables

UPDATE users 
  SET name = 'angelina'
  WHERE id = 1

--  Ordering the data by ascen or descen order or by column name type:

SELECT * 
FROM users 
ORDER BY name DESC;

-- deleting data 

DELETE FROM visited_countries
WHERE id = 9;

-- if from the family tracker, we have to jsut remove a perticular location of the user, then we can use:

DELETE FROM visited_countries 
WHERE user_id = 1 AND country_code = 'FR'
-- --  user 1 | country they visited = 'FR'

CREATE
READ
UPDATE 
DELETE



var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
var mysql = require('mysql');

app.use(bodyParser.urlencoded({extended: true}));
const router = express.Router();

  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'gkdb'
});
  
// connect to database
dbConn.connect(); 
 
 
// set port
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

 // Retrieve all users 
app.get('/assignments', function (req, res) {
    dbConn.query('SELECT * FROM assignments', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'assignments list all.' });
    });
});
//Retrieve all students under a specific teacherId
app.get('/teacher/:id', function (req,res) {
    let teacherId = req.params.id;
    var sql = "SELECT * from class where teacherId=?";
    dbConn.query(sql, [teacherId], function (err,result){
        if (err) throw err;
        return res.send({result});
    })
})
// Retrieve user with id 
app.get('/assignments/:id/single', function (req, res) {
    let studentId = req.params.id;
    var sql = 'SELECT * FROM assignments where studentId=?';
    dbConn.query(sql, [studentId], function (err,result) {
        if (err) throw err;
        return res.send({  result });
    })
});

//handles url http://localhost:6001/products/add
// Add a new user  
app.post('/assignments', function (req, res, next) {
    console.log(req.body);
    res.json(req.body);
    this.id = req.body.id;
    this.studentId = req.body.studentId;
    this.grade = req.body.grade;
    this.assignmentname = req.body.assignmentname
    dbConn.query("INSERT INTO assignments (id, studentId, grade, assignmentname) VALUES ('"+this.id+"','"+this.studentId+"','"+this.grade+"','"+this.assignmentname+"')");
});



module.exports = app;
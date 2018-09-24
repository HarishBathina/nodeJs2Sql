var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// Body Parser Middleware
app.use(bodyParser.json()); 

// const courses=[
//     {id:1,name:"course1"},
//     {id:2,name:"course2"},
//     {id:3,name:"course3"},
// ]
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});


// app.get('/',(req,res)=>{

//     const sql = require('mssql')
 
//        async () => {
//                try {
//                   await sql.connect('mssql://sa:Welcome@1234@localhost/HarishBathina')
//                   const result = await sql.query`select * from Amounts`;
//                         res.send(result);
//     } catch (err) {
//         // ... error checks
//     }
// }

//     //res.send('Hello World!!!');
// });

// app.get('/api/courses',(req,res)=>{
//     res.send(courses);
// });


// app.post('/api/courses',(req,res)=>{
//     const course ={
//         id:courses.length + 1,
//         name: req.body.name
//     };
//     courses.push(course);
//     res.send(course);
// })


// app.get('/api/courses/:id',(req,res)=>{
//     const course=courses.find(c=>c.id===parseInt(req.params.id));
//     if(!course) res.status(404).send("Course with given ID not found");
//     res.send(course);
// });

const port=process.env.PORT ||3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));

var dbConfig = {
    user:  'sa',
    password: 'Welcome@1234',
    server: 'ggku3ser2',
    database:'HarishBathina',
    //encrypt:true
};

var  executeQuery = function(res, query){   
    sql.close();

    sql.connect(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, result) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     res.send(err);
                                    }
                                    else {
                                             res.send(result.recordset);
                                        }
                              });
                      }
     });           
}

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/api/user/:id", function(req , res){
    var query = "select * from videos where videoId='"+req.params.id+"'";
    executeQuery (res, query);
});

app.get("/api/user/", function(req , res){
    var query = `select * from videos`;
    //console.log("hiii");
    executeQuery (res, query);
});

app.post("/api/user/", function(req , res){
    
    var query = "INSERT INTO videos  values ('"+req.body.videoId+"','"+req.body.Liked+"')";
    executeQuery (res,query);
});

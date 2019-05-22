'use strict'

const mongoose = require('mongoose');
const routes = require('./routes');
// Import Swagger Options
const swagger = require('./config/swagger');
const passportOptions = require('./config/passport');

const fastify = require('fastify')({
    logger: true
});

routes.forEach((route, index) => {
    fastify.route(route)
});

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);


// Run the server!
const start = async () => {
    try {
        await fastify.listen(3001);
        fastify.swagger();
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err);
        process.exit(1)
    }
};
start();

if(process.env.MONGO_PASS==undefined){
    throw Error("MongoDB password not set");
}else{

    var url = 'mongodb+srv://admin:'+ (process.env.MONGO_PASS).trim() + '@cluster0-klhgu.gcp.mongodb.net/test?retryWrites=true/users_db';
    console.log("pass: " + url);
    // Connect to DB
    mongoose.connect(url)
        .then(() => {
            console.log('MongoDB connected…');
            // Run the server!
            const start = async () => {
                try {
                    await fastify.listen(3001, '0.0.0.0', function (err, address) {
                        if (err) {
                            fastify.log.error(err);
                            process.exit(1)
                        }
                        fastify.swagger();
                        fastify.log.info(`server listening on ${fastify.server.address().port}`);
                    });

                } catch (err) {
                    fastify.log.error(err);
                    process.exit(1)
                }
            };
            start();
        })
        .catch(err => console.log(err));
}


// var http = require('http'),
//     url = require('url');
//
// var mysql = require('mysql');
//
//
// var db = mysql.createConnection({
//     host:     'localhost',
//     user:     'root',
//     password: 'dangerous',
//     database: 'shop'
// });
// var cart = [];
// var theuser=null;
// var theuserid =null;
// var server = http.createServer(function (request, response) {
//     var path = url.parse(request.url).pathname;
//     var url1 = url.parse(request.url);
//     console.log("path: "+path);
//     console.log("url: "+url1)
//     if (request.method == 'POST') {
//         switch (path) {
//
//
//             case "/login":
//                 var body = '';
//                 console.log("user Login ");
//                 request.on('data', function (data) {
//                     body += data;
//                 });
//
//                 request.on('end', function () {
//                     var obj = JSON.parse(body);
//                     console.log(JSON.stringify(obj, null, 2));
//                     var query = "SELECT * FROM Customer where name='"+obj.name+"'";
//                     response.writeHead(200, {
//                         'Access-Control-Allow-Origin': '*'
//                     });
//
//                     db.query(
//                         query,
//                         [],
//                         function(err, rows) {
//                             if (err) {
//                                 response.end('{"error": "1"}');
//                                 throw err;
//                             }
//                             if (rows!=null && rows.length>0) {
//                                 console.log(" user in database" );
//                                 theuserid = rows[0].customerID;
//                                 var obj = {
//                                     id: theuserid
//                                 }
//                                 response.end(JSON.stringify(obj));
//
//                             }
//                             else{
//                                 response.end('{"error": "1"}');
//                                 console.log(" user not in database");
//
//                             }
//
//                         }
//                     );
//
//
//                 });
//
//
//                 break;
//
//             case "/register":
//                 var body = '';
//                 console.log("user Register ");
//                 request.on('data', function (data) {
//                     body += data;
//                 });
//
//                 request.on('end', function () {
//                     var obj = JSON.parse(body);
//                     console.log(JSON.stringify(obj, null, 2));
//                     var query = "SELECT * FROM Customer where name='"+obj.name+"'";
//                     response.writeHead(200, {
//                         'Access-Control-Allow-Origin': '*'
//                     });
//
//                     db.query(
//                         query,
//                         [],
//                         function(err, rows) {
//                             if (err) {
//                                 response.end("error");
//                                 throw err;
//                             }
//                             if (rows!=null && rows.length>0) {
//                                 console.log(" user already in database");
//                                 response.end('{"error": "2"}');
//                             }
//                             else{
//                                 query = "INSERT INTO Customer (name, password, address)"+
//                                         "VALUES(?, ?, ?)";
//                                 db.query(
//                                     query,
//                                     [obj.name,obj.password,obj.address],
//                                     function(err, result) {
//                                         if (err) {
//                                             // 2 response is an sql error
//                                             response.end('{"error": "3"}');
//                                             throw err;
//                                         }
//                                         theuserid = result.insertId;
//                                         var obj = {
//                                             id: theuserid
//                                         }
//                                         response.end(JSON.stringify(obj));
//
//                                     }
//                                 );
//                             }
//
//                         }
//                     );
//
//
//                 });
//
//
//                 break;
//         } //switch
//     }
//
//
// });
// server.listen(3001);
//

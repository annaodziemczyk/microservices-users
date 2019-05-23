'use strict';
const mongoose = require('mongoose');
const routes = require('./routes');
const fastify = require('fastify')({
    logger: true
});
const passportOptions = require('./config/passport');

// Import Swagger Options
const swagger = require('./config/swagger');


if(process.env.MONGO_PASS==undefined){
    throw Error("MongoDB password not set");
}else{

    const local_db = 'mongodb://localhost/users';
    var url = 'mongodb+srv://admin:'+ (process.env.MONGO_PASS).trim() + '@cluster0-klhgu.gcp.mongodb.net/test?retryWrites=true';
    console.log("pass: " + url);
    // Connect to DB
    mongoose.connect(local_db)
        .then(() => {
            console.log('MongoDB connected…');
            // Run the server!
            const start = async () => {
                try {

                    // Register Swagger
                    fastify.register(require('fastify-swagger'), swagger.options);

                    routes.forEach((route, index) => {
                        fastify.route(route)
                    });

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
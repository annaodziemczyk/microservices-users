exports.options = {
    routePrefix: '/api',
    exposeRoute: true,
    swagger: {
        info: {
            title: 'User\'s API',
            description: 'Example of a microservice for shop\'s product catalogue',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json']
    }
};
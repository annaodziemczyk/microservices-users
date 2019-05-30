const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthenticationController');

const routes = [
    {
        method: 'POST',
        url: '/api/register',
        handler: userController.addUser
    },
    {
        method: 'GET',
        url: '/api/user',
        handler: userController.listUsers
    },
    {
        method: 'POST',
        url: '/api/login',
        preHandler: authController.authenticate,
        handler: authController.login
    },
    {
        method: 'POST',
        url: '/api/token',
        preHandler: authController.tokenAuthentication,
        handler: authController.login
    }
];

module.exports = routes;
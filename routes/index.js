const userController = require('../controllers/UserController');
const authController = require('../controllers/AuthenticationController');

const routes = [
    {
        method: 'POST',
        url: '/api/register',
        handler: userController.addUser
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
    },
    {
        method: 'POST',
        url: '/api/logout',
        handler: authController.logout
    }
];

module.exports = routes;
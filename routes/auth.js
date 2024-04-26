const express = require('express');
const authController = require('../controllers/auth');

//Defining a express router
const router = express.Router();

const { body } = require('express-validator');

const validateUser = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be atleast 8 characters')
        .isStrongPassword().withMessage('Password must contain atleast one uppercse, one lowercase and one symbol'),
    body('phone').isMobilePhone().withMessage('Please enter a valid phone')
];

const validatePassword = [
    body('newPassword')
        .isLength({ min: 8 }).withMessage('Password must be atleast 8 characters')
        .isStrongPassword().withMessage('Password must contain atleast one uppercse, one lowercase and one symbol'),
]

router.post('/login', authController.login);

router.post('/register', validateUser, authController.register);

router.get('/verify-token', authController.verifyToken);

router.post('/forgot-password', authController.forgotPassword);

router.post('/verify-otp', authController.verifyPasswordResetOTP);

router.post('/reset-password', validatePassword, authController.resetPassword);

//Exporting the router
module.exports = router;
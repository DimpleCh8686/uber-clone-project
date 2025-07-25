const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be atleast 1 passenger'),
    body('vehicle.vehicleType').isIn(['car','moto','auto']).withMessage('Invalid vehicle type'),
    body('vehicle.vehicleModel').isLength({ min: 2 }).withMessage('Vehicle model must be at least 2 characters long'),
],
    captainController.registerCaptain
)

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be atleast 6 characters long')
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile)
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

router.patch('/:id/stats',authMiddleware.authCaptain,captainController.updateStats);

module.exports = router;
const captainModel = require('../models/captain.model');
const mongoose = require('mongoose');
const captainService = require('../services/captain.service');
const blacklistTokenModel = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');
const rideModel = require('../models/ride.model')

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});

    if(isCaptainAlreadyExist){
        return res.status(400).json({message: 'Captain already exists'});
    }
    
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        vehicleModel: vehicle.vehicleModel
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token, captain});
}


module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain});
}


module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistTokenModel.create({token});

    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
}

module.exports.updateStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rides = 0, hours = 0, earnings = 0 } = req.body;

    if (req.captain._id.toString() !== id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await captainModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          noOfRides: rides,
          hoursOnline: hours,
          earnings: earnings
        }
      },
      { new: true, select: '-password' }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Captain not found' });
    }

    res.status(200).json({ captain: updated });
  } catch (err) {
    next(err);
  }
};
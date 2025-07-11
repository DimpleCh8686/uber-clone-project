const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const captainModel = require('../models/captain.model');

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType
    });

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );

    const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
    rideWithUser.otp = undefined;

    captainsInRadius.map(captain => {
      sendMessageToSocketId(captain.socketId, {
        event: 'new-ride',
        data: rideWithUser
      });
    });

    res.status(201).json(rideWithUser);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-confirmed',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;

  try {
    const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

    // Set start time
    ride.startTime = new Date();
    await ride.save();

    sendMessageToSocketId(ride.user.socketId, {
      event: 'ride-started',
      data: ride
    });

    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


module.exports.endRide = async (req, res) => {
  try {
    const { rideId } = req.body;

    if (!rideId) {
      return res.status(400).json({ message: 'Ride ID is required' });
    }

    const ride = await rideModel.findOne({ _id: rideId });
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.status !== 'ongoing') {
      return res.status(400).json({ message: 'Ride not ongoing' });
    }

    ride.status = 'completed';
    ride.endTime = new Date();
    await ride.save();

    const captainId = ride.captain;
    const rideFare = ride.fare ?? 0;

    let durationHours = 0;

    if (ride.duration) {
      const hourMatch = ride.duration.match(/(\d+)\s*hour/);
      const minMatch = ride.duration.match(/(\d+)\s*min/);

      const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
      const minutes = minMatch ? parseInt(minMatch[1], 10) : 0;

      durationHours = parseFloat((hours + minutes / 60).toFixed(2));
    }


    if (!captainId) {
      return res.status(400).json({ message: 'Captain ID missing from ride' });
    }

    const updatedCaptain = await captainModel.findByIdAndUpdate(
      captainId,
      {
        $inc: {
          earnings: rideFare,
          noOfRides: 1,
          hoursOnline: durationHours
        }
      },
      { new: true, projection: { password: 0 } }
    );

    const populatedRide = await rideModel.findById(rideId).populate('user');

    sendMessageToSocketId(populatedRide.user.socketId, {
      event: 'ride-ended',
      data: populatedRide
    });

    // console.log(`Ride ${rideId} completed by Captain ${captainId}`);
    // console.log(durationHours);
    // console.log(updatedCaptain.earnings);
    // console.log(updatedCaptain.noOfRides);
    // console.log(updatedCaptain.hoursOnline);

    return res.status(200).json({
      message: 'Ride completed',
      ride: populatedRide,
      updatedCaptain
    });

  } catch (error) {
    console.error('Error finishing ride:', error);
    return res.status(500).json({ message: 'Failed to finish ride' });
  }
};
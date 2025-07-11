const  captainModel = require('../models/captain.model');

module.exports.createCaptain = async({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType, vehicleModel
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType || !vehicleModel){
        throw new Error('All fields are required');
    }
    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
            vehicleModel
        },
        earnings: 0,
        noOfRides: 0,
        hoursOnline: 0
    })

    return captain;
}
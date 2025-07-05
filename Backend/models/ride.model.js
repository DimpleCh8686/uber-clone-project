const moongose = require('mongoose');


const rideSchema = new moongose.Schema({
    user:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain:{
        type: moongose.Schema.Types.ObjectId,
        ref: 'captain',
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending'
    },
    duration:{//in seconds
        type: Number
    },
    distance:{//in meters
        type: Number
    },
    paymentID:{
        type: String,
    },
    orderId:{
        type: String,
    },
    signature:{
        type: String,
    },
    otp:{
        type: String,
        select: false,
        required: true
    }
})

module.exports = moongose.model('ride', rideSchema);
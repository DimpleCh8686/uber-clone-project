const mongoose = require('mongoose');


const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
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
        type: String,
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
    },
    distance:{
        type: Number,
        required: true
    },
},{
  timestamps: true
});

module.exports = mongoose.model('ride', rideSchema);
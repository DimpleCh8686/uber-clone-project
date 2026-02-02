// const axios = require('axios');
// const captainModel = require('../models/captain.model');

// module.exports.getAddressCoordinate = async (address) => {
//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             const location = response.data.results[ 0 ].geometry.location;
//             return {
//                 ltd: location.lat,
//                 lng: location.lng
//             };
//         } else {
//             throw new Error('Unable to fetch coordinates');
//         }
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

// module.exports.getDistanceTime = async (origin, destination) => {
//     if (!origin || !destination) {
//         throw new Error('Origin and destination are required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;

//     const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             const element = response.data.rows[0].elements[0];

//             if (element.status === 'ZERO_RESULTS') {
//                 throw new Error('No routes found');
//             }

//             return {
//                 distance: {
//                     text: element.distance.text,
//                     value: element.distance.value
//                 },
//                 duration: {
//                     text: element.duration.text,
//                     value: element.duration.value
//                 }
//             };
//         } else {
//             throw new Error('Unable to fetch distance and time');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }


// module.exports.getAutoCompleteSuggestions = async (input) => {
//     if (!input) {
//         throw new Error('query is required');
//     }

//     const apiKey = process.env.GOOGLE_MAPS_API;
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

//     try {
//         const response = await axios.get(url);
//         if (response.data.status === 'OK') {
//             return response.data.predictions.map(prediction => prediction.description).filter(value => value);
//         } else {
//             throw new Error('Unable to fetch suggestions');
//         }
//     } catch (err) {
//         console.error(err);
//         throw err;
//     }
// }

// module.exports.getCaptainsInTheRadius = async(ltd, lng, radius)=>{
//     //radius=>km
//     const captains = await captainModel.find({
//         location:{
//             $geoWithin:{
//                 $centerSphere: [ [ ltd, lng ], radius/6371 ]
//             }
//         }
//     });
//     return captains
// }



const axios = require("axios");
const captainModel = require("../models/captain.model");

/**
 * 📍 Get coordinates from address (Mapbox Geocoding)
 */
module.exports.getAddressCoordinate = async (address) => {
    if (!address) throw new Error("Address is required");

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${process.env.GOOGLE_MAPS_API}&limit=1`;

    try {
        const response = await axios.get(url);

        if (!response.data.features.length) {
            throw new Error("No location found");
        }

        const [lng, lat] = response.data.features[0].center;

        return {
            ltd: lat,
            lng: lng
        };
    } catch (error) {
        console.error("Geocoding error:", error.message);
        throw error;
    }
};

/**
 * 🚗 Get distance & time (Mapbox Directions)
 */
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and destination are required");
    }

    // origin & destination = { lng, ltd }
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.ltd};${destination.lng},${destination.ltd}?access_token=${process.env.GOOGLE_MAPS_API}`;

    try {
        const response = await axios.get(url);

        if (!response.data.routes.length) {
            throw new Error("No route found");
        }

        const route = response.data.routes[0];

        return {
            distance: {
                text: `${(route.distance / 1000).toFixed(2)} km`,
                value: route.distance
            },
            duration: {
                text: `${Math.round(route.duration / 60)} mins`,
                value: route.duration
            }
        };
    } catch (error) {
        console.error("Directions error:", error.message);
        throw error;
    }
};

/**
 * 🔍 Autocomplete (Mapbox Search)
 */
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) throw new Error("Query is required");

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
    )}.json?access_token=${process.env.GOOGLE_MAPS_API}&autocomplete=true&limit=5`;

    try {
        const response = await axios.get(url);

        return response.data.features
            .map((item) => item.place_name)
            .filter(Boolean);
    } catch (error) {
        console.error("Autocomplete error:", error.message);
        throw error;
    }
};

/**
 * 📡 Find captains within radius (FIXED)
 */
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371]
            }
        }
    });

    return captains;
};

const { fetchMyIp } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const {fetchISSFlyOverTimes} = require("./iss");
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("99.231.248.165", (error, geoLoc) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! Returned Geo Coordinates are:`, geoLoc);
// });


// fetchISSFlyOverTimes({ latitude: 43.8508553, longitude: -79.0203732 }, (error, times) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log(`It worked! The flyover times for the ISS are:`, times);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration  = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
}


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});


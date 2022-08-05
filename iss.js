const request = require("request");

// const fetchMyIp = function(callback) {
//   let url = "https://api.ipify.org?format=json";
//   request(url, (error, response, body) => {
//     if (error) {
//       return callback(error, null);
//     }
//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
//       callback(Error(msg), null);
//     }
//     const ip = JSON.parse(body).ip;
//     callback(null, ip);
//   });
// };

// const fetchCoordsByIP = function (ip, callback) {
//   let url2 = `http://ipwho.is/${ip}`;
//   request(url2, (error, response, body) => {
//     if (error) {
//       return callback(error, null);
//     }

//     const parsedBody = JSON.parse(body);

//     if (!parsedBody.success) {
//       const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
//       return callback(Error(message), null);
//     }

//     const { latitude, longitude } = parsedBody;
//     callback(null, { latitude, longitude });
//   });
// };

// const fetchISSFlyOverTimes = function(coords, callback) {
//   const latitude = coords.latitude;
//   const longitude = coords.longitude;
//   let url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
//   request(url , (error, response, body) => {
//     if (error) {
//       return callback(error, null);
//     }

//     if (response.statusCode !== 200) {
//       const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
//       return callback(Error(msg), null)
//     }

//     const parsedBody = JSON.parse(body);
//     callback(null, parsedBody.response)

//   })
// };

const nextISSTimesForMyLocation = function (callback) {
  let url = "https://api.ipify.org?format=json";
  request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }
    const ip = JSON.parse(body).ip;
    let url2 = `http://ipwho.is/${ip}`;
    request(url2, (error, response, body) => {
      if (error) {
        return callback(error, null);
      }

      const parsedBody = JSON.parse(body);

      if (!parsedBody.success) {
        const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
        return callback(Error(message), null);
      }

      const { latitude, longitude } = parsedBody;

      let url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
      request(url, (error, response, body) => {
        if (error) {
          return callback(error, null);
        }

        if (response.statusCode !== 200) {
          const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
          return callback(Error(msg), null);
        }

        const parsedBody = JSON.parse(body);
        callback(null, parsedBody.response);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };

//module.exports = { fetchMyIp };

//module.exports = { fetchCoordsByIP };

//module.exports = {fetchISSFlyOverTimes};

// This is the testing server
const host = 'http://localhost:8010'


// These functions are provided by the backend, to fetch data. They are open to everyone
export const fetchBoundingBoxUrl = (boundingBox) => {
  return fetch(host +"/v2/api/gwbbox", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boundingBox)
  })
}

export const fetchGWDetailsList = (listOfGateways) => {
  return fetch(host +"/v2/api/gateways", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}

export const fetchGWRadarsList = (listOfGateways) => {
  return fetch(host +"/v2/api/coverage/radar", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}

export const fetchGWAlphaShapeList = (listOfGateways) => {
  return fetch(host +"/v2/api/coverage/alpha", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}


// Used by first style of special mdoe gateway
// export const verifyGw = (gwId) => {
//   let p = promiseTimeout(500, gwId)
//   p.then(function(val){
//     return {gwExists: val.length % 2}
//   })
//   return p
// }

export async function searchGateways(search_term, page){
  const response = await fetch(host + "/v2/api/gateways/search", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"s": search_term, "page": page})
  })

  return await response.json();
}





// These functions are provided by the login server, to aid in logging in
export const getTTNLoginLink = () => {
  return 'http://127.0.0.1:8011/loginProvider/login?state=1&response_type=code&client_id=ttn-mapper&redirect_uri=http://localhost:8010/loggedin'
}

export const exchangeCodeForToken = (code) => {
  return fetch(host +"/api/v1/accounts/login", {
    method: "POST",
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"code": code})
  })
}

export const verifyExistingToken = (code) => {
  return fetch(host +"/api/v1/verifyExistingToken", {
    method: "POST",
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"mToken": code})
  })
}

export const checkTicket = (ticket) => {
  return fetch(host +"/api/v1/accounts/verifyToken", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"ticket": ticket})
  })
}






// These functions are provided by the login server to fetch data from TTN
export const getApplication = () => {
  return fetch(host + "/api/v1/application/")
}

export const getApplicationDetail = (app_id) => {
  return fetch(host + "/api/v1/application/" + app_id)
}

export const getDevices = (app_id) => {
  return fetch(host + "/api/v1/application/"+app_id+ "/device")
}













export const fetchPacketData = (deviceId, dateRange) => {
  return fetch(host +"/api/v1/getDevicePackets", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"deviceID": deviceId, "dateRange": ""})
  })
}


function promiseTimeout (time, arg) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(arg);
    },time);
  });
};


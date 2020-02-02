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

// Todo: Deprecate
/*
export const fetchGWCirclesList = (listOfGateways) => {
  return fetch(host +"/old_api/gwcirclelist.php", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}
*/

export const fetchGWAlphaShape = (gatewayID) => {
  return fetch(host +"/v2/api/coverage/alpha"+gatewayID+"/alphashape.geojson", {
    method: "GET"
  })
}

export const fetchGWDetails = (gatewayID) => {
  return fetch(host + '/old_api/gwdetails.php?gwaddr=' + gatewayID)
}

//TODO: This is the old method, update this
export const fetchGWCircles = (gatewayID) => {
  return fetch(host + '/old_api/geojson/'+gatewayID+'/circle-single.geojson')
}

export const fetchGWRadars = (gatewayID) => {
  return fetch(host + '/old_api/geojson/'+gatewayID+'/radar-single.geojson')
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

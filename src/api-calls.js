const host = 'http://localhost:8010'

export const getApplication = () => {
  return fetch(host + "/api/v1/application/")
}

export const getApplicationDetail = (app_id) => {
  return fetch(host + "/api/v1/application/" + app_id)
}

export const getDevices = (app_id) => {
  return fetch(host + "/api/v1/application/"+app_id+ "/device")
}


export const fetchBoundingBoxUrl = (boundingBox) => {
  return fetch(host +"/old_api/gwbbox.php", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(boundingBox)
  })
}



export const fetchGWDetails = (gatewayID) => {
  return fetch(host + '/old_api/gwdetails.php?gwaddr=' + gatewayID)
}

export const fetchGWCircles = (gatewayID) => {
  return fetch(host + '/old_api/geojson/'+gatewayID+'/circle-single.geojson')
}

export const fetchGWRadars = (gatewayID) => {
  return fetch(host + '/old_api/geojson/'+gatewayID+'/radar-single.geojson')
}




export const fetchGWDetailsList = (listOfGateways) => {
  return fetch(host +"/old_api/gwdetailslist.php", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}

export const fetchGWCirclesList = (listOfGateways) => {
  return fetch(host +"/old_api/gwcirclelist.php", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}

export const fetchGWRadarsList = (listOfGateways) => {
  return fetch(host +"/old_api/gwradarlist.php", {
    method: "POST",
    //headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"gateways": listOfGateways})
  })
}

export const fetchGWAlphaShape = (gatewayID) => {
  return fetch(host +"/old_api/geojson/"+gatewayID+"/alphashape.geojson", {
    method: "GET"
  })
}

export const getTTNLoginLink = () => {
  return 'http://127.0.0.1:8011/loginProvider/login?state=1&response_type=code&client_id=ttn-mapper&redirect_uri=http://localhost:8010/loggedin'
}


export const exchangeCodeForToken = (code) => {
  return fetch(host +"/api/v1/login", {
    method: "POST",
    // headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"code": code})
  })
}

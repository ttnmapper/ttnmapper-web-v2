
export function parseCoordsFromQuery(queryString) {
  // Remove the '?' at the beginning, split by comma
  var partsOfStr = queryString.substring(1).split('&');

  const parsedCoords = {
    lat: null,
    long: null,
    zoom: null
  }

  for (var ind in partsOfStr) {
    //Split into name and value
    var assignment = partsOfStr[ind].split('=')
    if (assignment.length == 2) {
      switch (assignment[0]) {
        case 'lat': parsedCoords.lat = assignment[1]; break;
        case 'long': parsedCoords.long = assignment[1]; break;
        case 'zoom': parsedCoords.zoom = assignment[1]; break;
      }
    }
  }

  return parsedCoords
}


export function parseSingleGatewayFromQuery(queryString) {
  // Remove the '?' at the beginning, split by comma
  var partsOfStr = queryString.substring(1).split('&');

  const parsedGateway = {
    gateway: null,
    type: null,
    hideothers: null
  }

  for (var ind in partsOfStr) {
    //Split into name and value
    var assignment = partsOfStr[ind].split('=')
    if (assignment.length == 2) {
      switch (assignment[0]) {
        case 'gateway': parsedCoords.gateway = assignment[1]; break;
        case 'type': parsedCoords.type = assignment[1]; break;
        case 'hideothers': parsedCoords.hideothers = assignment[1]; break;
      }
    }
  }

  return parsedCoords
}


export function parseQuery(queryString) {
  var partsOfStr = queryString.substring(1).split('&');

  let params = {}

  for (var ind in partsOfStr) {
    //Split into name and value
    var assignment = partsOfStr[ind].split('=')
    if (assignment.length == 2) {
        params[assignment[0]] = assignment[1];
    }
  }
  return params
}

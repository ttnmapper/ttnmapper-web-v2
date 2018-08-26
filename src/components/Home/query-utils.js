
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

// Encode the location data received via the UI to GeoJSON ready for sending to the Elixir app.

const stringToGeoPoint = (params) => {
  return {
      type: "Point",
      coordinates: params.split(",").map((str) => { return parseFloat(str) })
  }
}

const arrayToGeoPoint = (paramsArray) => {
  return {
    type: "Point",
    coordinates: paramsArray
  }
}

const inputToGeoPoint = (input) => {
  if (typeof input === 'string') {
    return stringToGeoPoint(input)
  }
  else if (typeof input === 'object') {
    return arrayToGeoPoint(input)
  }
};

module.exports = {
  stringToGeoPoint: stringToGeoPoint,
  arrayToGeoPoint: arrayToGeoPoint,
  inputToGeoPoint: inputToGeoPoint
}
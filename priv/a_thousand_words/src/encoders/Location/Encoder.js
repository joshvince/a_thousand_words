// Encode the location data received via the UI to GeoJSON ready for sending to the Elixir app.

const stringToGeoPoint = (params) => {
  return {
      type: "Point",
      coordinates: params.split(",").map((str) => { return parseFloat(str) })
  }
}

module.exports = {
  stringToGeoPoint: stringToGeoPoint
}
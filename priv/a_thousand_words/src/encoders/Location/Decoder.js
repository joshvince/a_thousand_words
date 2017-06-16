// Decode the objects received from the DB to something we can work with in the UI

const objectToString = (object) => {
  return object.coordinates.join(",")
}

const Decoder = {
  decode: objectToString
}

export default Decoder;
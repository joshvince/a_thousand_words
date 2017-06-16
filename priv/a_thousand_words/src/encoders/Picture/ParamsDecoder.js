import LocationDecoder from '../Location/Decoder.js';
// convert data received from the server into a format the UI can use.

const decode = (params) => {
  return {
    ...params, 
    location: LocationDecoder.decode(params.location)
  }
}

const Decoder = {
  decode: decode
}

export default Decoder;
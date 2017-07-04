import LocationEncoder from '../Location/Encoder.js';

// convert form data, or json, to the correct format to be sent to the server.

/* 
GeoJSON has a specific format - eventually it should automatically be created 
in the correct format. For now we have to manually convert it. 
FIXME!
*/
const encode = (params) => {
  return {
      name: params.name,
      description: params.description,
      year: convertToInt(params.year),
      location: LocationEncoder.inputToGeoPoint(params.location),
      image: params.image
  }
}

const convertToInt = (param) => {
  if (typeof param === 'string') {
    return parseInt(param, 10);
  }
  else {
    return param;
  }
} 


const ParamEncoder = {
  encode: encode,
  convertToInt: convertToInt
}

export default ParamEncoder;
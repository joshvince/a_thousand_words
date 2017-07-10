// convert data received from the server into a format the UI can use.

const buildImgUrl = (url) => {
  return `${process.env.REACT_APP_IMAGE_SERVER}${url}`
};

const decode = (params) => {
  return {
    ...params,
    image: buildImgUrl(params.image)
  }
};

const Decoder = {
  decode: decode
}

export default Decoder;
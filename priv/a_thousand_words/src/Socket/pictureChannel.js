/*
Functions for communicating with the picture channel
*/

// join
// Takes a socket and joins a channel
const join = (socket) => {
  let channel = socket.channel("artifacts:picture", {})
  channel.join()
    .receive("ok", resp => { 
      console.log("Joined successfully", resp) 
    })
    .receive("error", resp => { console.log("Unable to join", resp) })
  return channel
};

// create picture
// takes in a channel object and some picture params, creates a picture and returns the response from the server
const createPicture = (channel, pictureParams) => {
  return new Promise((resolve, reject) => {
    channel.push("create_picture", {params: pictureParams})
      .receive("ok", resp => {
        resolve(resp.picture)
      })
      .receive("error", resp => {
        reject(resp)
      })
  })
};

// list pictures 
// takes in a channel, pushes a message to it to get all the pictures in the channel and returns when the reply arrives.
const listPictures = (channel) => {
  return new Promise((resolve, reject) => {
    channel.push("list_pictures")
      .receive("ok", resp => {
        console.log("list_pictures received", resp)
        resolve(resp.pictures)
      })
      .receive("error", resp => {
        console.log(`received: ${JSON.stringify(resp)}`)
        reject(resp)
      })
  });
};


// delete picture
const deletePicture = (channel, picture) => {
  channel.push("delete_picture", {id: picture.id})
    .receive("ok", resp => {
      console.log("Picture deleted, resp is: ", resp)
    })
};

module.exports = {
  join: join,
  createPicture: createPicture,
  listPictures: listPictures,
  deletePicture: deletePicture
}
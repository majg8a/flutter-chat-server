import uWS from "uWebSockets.js";
const PORT = process.env.PORT || 5000;

const users = {};
const messages = [];

const app = uWS.App().ws("/*", {
  //onConnect
  open: async (ws, req) => {},

  //onMessage
  message: (ws, message, isBinary) => {
    const json = JSON.parse(Buffer.from(message).toString("utf-8"));
    const actions = {
      ADD_USER: () => {
        const userData = ws.getUserData();
        userData.ws = ws;
        users[new Date().valueOf()] = userData;
      },
      ADD_MESSAGE: () => {},
    };

    
    // message = Buffer.from(message).toString("utf-8");
    // console.log(`recived: ${message}`);
    ws.send();
  },
});

app.listen(PORT, (listenSocket) => {
  console.log(`listening on port ${PORT}!`);
});

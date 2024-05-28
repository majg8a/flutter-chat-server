import uWS from "uWebSockets.js";
const PORT = process.env.PORT || 5000;

const users = {};
const messages = [];

const app = uWS.App().ws("/*", {
  //onConnect
  open: async (ws, req) => {},

  //onMessage
  message: (ws, message) => {
    try {
      const string = Buffer.from(message).toString("utf-8");
      const json = JSON.parse(string);
      const actions = {
        ADD_USER: () => {
          const userData = ws.getUserData();
          userData.ws = ws;
          const id = new Date().valueOf();
          users[id] = userData;
          ws.send(id.toString());
        },
        ADD_MESSAGE: () => {},
      };

      actions[json.action] ? actions[json.action]() : null;
    } catch (error) {
      console.log(error);
    }

    // message = Buffer.from(message).toString("utf-8");
    // console.log(`recived: ${message}`);
  },
});

app.listen(PORT, (listenSocket) => {
  console.log(`listening on port ${PORT}!`);
});

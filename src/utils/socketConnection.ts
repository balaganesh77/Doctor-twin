import socketIO from "socket.io";
import logger from "../config/logger";

interface CustomSocket extends socketIO.Socket {
  userId?: string;
}

const socketIOManager = function (io: any) {
  logger.info("Socket Connected Successfully");
  io.on("connection", function (clientSocket: CustomSocket) {
    clientSocket.on("connectUser", async function (data) {
      clientSocket.userId = data["id"];
      console.log(
        "Connected userId: " +
          clientSocket.userId +
          " socketId: " +
          clientSocket.id,
      );
      clientSocket.emit("connectUser_ack", {
        message: "Connected successfully",
        data: {
          userId: clientSocket.userId,
        },
      });
    });

    clientSocket.on("disconnect", function () {
      console.log(
        "Disconnected userId: " +
          clientSocket.userId +
          " socketId: " +
          clientSocket.id,
      );
    });
  });
};

export { socketIOManager, CustomSocket };

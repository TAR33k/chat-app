import { Server } from "socket.io";
import http from "http";
import express from "express";
import { redisClient } from "./redis.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const ONLINE_USERS_KEY = "online_users";

export const getReceiverSocketId = async (userId) => {
  if (!userId) return null;

  try {
    const socketId = await redisClient.hGet(ONLINE_USERS_KEY, userId.toString());
    return socketId || null;
  } catch (err) {
    console.error("Error getting receiver socket id from Redis", err);
    return null;
  }
};

const emitOnlineUsers = async () => {
  try {
    const onlineUsers = await redisClient.hKeys(ONLINE_USERS_KEY);
    io.emit("getOnlineUsers", onlineUsers || []);
  } catch (err) {
    console.error("Error emitting online users from Redis", err);
    io.emit("getOnlineUsers", []);
  }
};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    redisClient
      .hSet(ONLINE_USERS_KEY, userId.toString(), socket.id)
      .catch((err) => {
        console.error("Error storing online user in Redis", err);
      })
      .finally(() => {
        emitOnlineUsers();
      });
  } else {
    emitOnlineUsers();
  }

  socket.on("disconnect", () => {
    if (userId) {
      redisClient
        .hDel(ONLINE_USERS_KEY, userId.toString())
        .catch((err) => {
          console.error("Error removing online user from Redis", err);
        })
        .finally(() => {
          emitOnlineUsers();
        });
    } else {
      emitOnlineUsers();
    }
  });

  socket.on("typing", async ({ receiverId }) => {
    if (!receiverId || !userId) return;

    try {
      const receiverSocketId = await redisClient.hGet(
        ONLINE_USERS_KEY,
        receiverId.toString()
      );

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", { senderId: userId });
      }
    } catch (err) {
      console.error("Error handling typing event", err);
    }
  });

  socket.on("stopTyping", async ({ receiverId }) => {
    if (!receiverId || !userId) return;

    try {
      const receiverSocketId = await redisClient.hGet(
        ONLINE_USERS_KEY,
        receiverId.toString()
      );

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userStopTyping", { senderId: userId });
      }
    } catch (err) {
      console.error("Error handling stopTyping event", err);
    }
  });
});

export { io, app, server };

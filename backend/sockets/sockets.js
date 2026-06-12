import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import {User} from "../models/index.js";
import {Message} from "../models/messages.models.js";
let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: process.env.CORS_ORIGIN || "*",
            credentials: true
        }
    });

    io.use(
        async (
            socket,
            next
        ) => {

            try {

                const token = socket.handshake.auth.token;

                if (!token) {
                    return next(
                        new Error(
                            "Unauthorized"
                        )
                    );
                }

                const decoded =
                    jwt.verify(
                        token,
                        process.env.ACCESS_TOKEN_SECRET
                    );

                const user =
                    await User.findById(
                        decoded._id
                    ).select("-refreshToken -password");

                if (!user) {
                    return next(
                        new Error(
                            "User not found"
                        )
                    );
                }

                socket.user = user;

                next();

            } catch {

                next(
                    new Error(
                        "Unauthorized"
                    )
                );
            }
        }
    );

    io.on("connection", (socket) => {


        const roomId =
            `${socket.user.schoolId}-${socket.user.className}-${socket.user.sectionName}`;

        socket.join(roomId);

        //SEND MESSAGE FUNCTIONALITY
        socket.on("send-message", async (payload) => {
            try {
                const { message } = payload || {};

                if (!message || typeof message !== "string" || message.trim().length === 0) {
                    return socket.emit("chat-error", { message: "Message cannot be empty" });
                }

                if (message.trim().length > 1000) {
                    return socket.emit("chat-error", { message: "Message too long (max 1000 characters)" });
                }

                const savedMessage = await Message.create({
                    senderId: socket.user._id,
                    senderName: socket.user.fullName,
                    schoolId: socket.user.schoolId,
                    className: socket.user.className,
                    sectionName: socket.user.sectionName,
                    message: message.trim()
                });

                io.to(roomId).emit("receive-message", savedMessage);

            } catch (error) {
                socket.emit("chat-error", { message: "Failed to send message" });
            }
        });

        //TYPING FUNCTIONALITY
        socket.on(
            "typing",
            () => {

                const roomId =
                    `${socket.user.schoolId}-${socket.user.className}-${socket.user.sectionName}`;

                socket.to(roomId).emit(
                    "typing",
                    {
                        userId: socket.user._id,
                        name: socket.user.fullName
                    }
                );
            }
        );

        socket.on(
            "stop-typing",
            () => {

                const roomId =
                    `${socket.user.schoolId}-${socket.user.className}-${socket.user.sectionName}`;

                socket.to(roomId).emit(
                    "stop-typing",
                    {
                        userId: socket.user._id
                    }
                );
            }
        );

        socket.on(
            "edit-message",
            async ({ messageId, message }) => {
                try {
                    if (!message || typeof message !== "string" || message.trim().length === 0) {
                        return socket.emit("chat-error", { message: "Message cannot be empty" });
                    }

                    const updated =
                        await Message.findOneAndUpdate(
                            {
                                _id: messageId,
                                senderId: socket.user._id
                            },
                            {
                                message: message.trim(),
                                edited: true
                            },
                            { new: true }
                        );

                    if (!updated) {
                        return socket.emit("chat-error", { message: "Message not found" });
                    }

                    io.to(roomId).emit("message-edited", updated);
                } catch (error) {
                    socket.emit("chat-error", { message: "Failed to edit message" });
                }
            });

        socket.on("delete-message",
                    async ({ messageId }) => {
            try {

                const deletedMessage =
                    await Message.findOneAndDelete({
                        _id: messageId,
                        senderId: socket.user._id
                    });

                if (!deletedMessage) {
                    return socket.emit("chat-error", {
                        message: "Message not found"
                    });
                }

                io.to(roomId).emit(
                    "message-deleted",
                    { messageId }
                );

            } catch (error) {
                console.error(error);

                socket.emit("chat-error", {
                    message: "Failed to delete message"
                });
            }
        });



    });
}
export { io };
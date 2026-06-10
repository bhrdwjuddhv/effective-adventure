import { Server } from "socket.io";
import {Message} from "../models/messages.models.js";
let io;

export const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            credentials: true
        }
    });

    io.on("connection", (socket) => {


        console.log("CONNECTED");
        console.log(socket.id);



        //JOIN ROOM FUNCTIONALITY
        socket.on(
            "join-section",
            (data) => {

                const roomId = `${data.schoolId}-${data.className}-${data.sectionName}`;

                socket.join(roomId);

                console.log(
                    `${socket.id} joined ${roomId}`
                );

                socket.emit(
                    "joined",
                    roomId
                );
            }
        );

        //SEND MESSAGE FUNCTIONALITY
        socket.on(
            "send-message",
            async (data) => {

                const roomId =
                    `${data.schoolId}-${data.className}-${data.sectionName}`;

                const savedMessage = await Message.create({
                        schoolId : data.schoolId,
                        className: data.className,
                        sectionName: data.sectionName,
                        senderId: data.senderId,
                        message: data.message
                    });

                io.to(roomId).emit(
                    "receive-message",
                    {
                        sender: data.sender,
                        message: savedMessage
                    }
                );

            }
        );



    });
}
export { io };
import connectDb from "./db/index.js";
import http from "http";
import {app} from "./app.js";
import {initializeSocket} from "./sockets/sockets.js";
import dotenv from "dotenv";

dotenv.config();


const server = http.createServer(app);


connectDb()
    .then(()=>{
        initializeSocket(server);

        server.listen(process.env.PORT, ()=>{
            console.log("Listening on port " + process.env.PORT);
        })
    })
    .catch(err => console.log(err));
import connectDb from "./db";
import http from "http";
import {app} from "./app.js";

connectDb()
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("Listening on port " + process.env.PORT);
        })
    })
    .catch(err => console.log(err));
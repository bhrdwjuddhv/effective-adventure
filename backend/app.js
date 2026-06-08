import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({
    limit: "16kb",
}));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",

}));
app.use(express.static("public"));
app.use(cookieParser());


//routes
import userRouter from "./router/user.router.js";
import teacherRouter from "./router/teacher.router.js";
import adminRouter from "./router/admin.router.js";
import schoolRouter from "./router/school.router.js";
import holidayRouter from "./router/holiday.router.js";
import attendanceRouter from "./router/attendance.router";


//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/school", schoolRouter);
app.use("/api/v1/holiday", holidayRouter);
app.use("/api/v1/attendance", attendanceRouter);



export { app };
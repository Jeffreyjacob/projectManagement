import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import projectRoute from "./routes/projectRoute";
import taskRoute from "./routes/taskRoute";
import searchRoute from "./routes/searchRoute"
import userRoute from "./routes/userRoute";
import teamRoute from "./routes/teamRoute";

dotenv.config();


const app = express()

app.use(express.json())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.use("/api/project",projectRoute)
app.use("/api/task",taskRoute)
app.use("/api/search",searchRoute)
app.use("/api/user",userRoute)
app.use("/api/team",teamRoute)

const port = Number(process.env.PORT) || 8000;
app.listen(port,"0.0.0.0",()=>{
    console.log(`Server is running on Port ${port}`)
})
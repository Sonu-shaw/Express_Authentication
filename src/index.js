import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import authRoute from "./route/authRoute.js"
import userRoute from "./route/userRoute.js"

const app = express();

dotenv.config();
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

app.use(bodyParser.json());

app.get("/api", (req, res) => {    
    res.json({ msg: "HELLO AUTH" })
})

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("DB connected successfully");
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);

        })
    })
    .catch((error) => {
        console.log(error);

    })
import express from 'express';
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import userRoutes from "./routes/Users.js"
import profileRoutes from "./routes/Profile.js"
import connect from "./config/db.js"
dotenv.config();
const app = express();
// connect mongodb 
connect();
// body-parser middleware
app.use(bodyParser.json())
app.use('/', userRoutes);
app.use('/', profileRoutes);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Your app is running!')
})

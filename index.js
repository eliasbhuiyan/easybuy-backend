const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();
const dbconfig = require("./config/dbconfig");
const path = require("path");
routes = require("./routes");
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors(
  {
    origin: [
      "https://easybuy-dashbord.netlify.app",
      "https://easybuy-dashbord.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true
  }
));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  // res.setHeader('Access-Control-Allow-Origin', 'https://easybuy-dashbord.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
dbconfig();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(routes);

app.listen(8000, () => {
  console.log("Server is running");
});

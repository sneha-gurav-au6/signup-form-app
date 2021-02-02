const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();
require("./db");
app.use(express.json());

const userRoute = require("./routes/userRoute");
app.use(userRoute);

// app.use(express.static("client/build"));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.get("/", (req, res) => {
    res.send("hello");
});
app.listen(PORT, () => {
    console.log("server started");
});

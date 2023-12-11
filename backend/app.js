const express = require("express")
const app = express();
const cors = require("cors");
const userRoutes = require("./src/router/users")
const propertyRoutes = require("./src/router/property")
const sqlRoutes = require("./src/router/sql")
var bodyParser = require('body-parser')

app.use(bodyParser.text());
// const pool = require("./db");

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/user",userRoutes)
app.use("/property",propertyRoutes)
app.use("/sql",sqlRoutes)
// parse application/json
app.use(bodyParser.json())


app.get("/",async (req,res) => {
    res.send("Hello Wrld")
})
app.listen(5000, () => {
    console.log("server has started on port 5000");
  });
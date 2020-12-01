const express = require("express");
var app = express();
const { mongoose } = require("./db.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));
//Import Routes
// const itemsRoute = require("./routes/items");
const usersRoute = require("./routes/users");
// app.use("/items", itemsRoute);
app.use("/users", usersRoute);
//ROUTES
app.get("/", (req, res) => {
	res.send("We are on home");
});
app.listen(port, () => {
	console.log(`Server started at port : 3000`);
});
//app.use("/orders", itemsController);

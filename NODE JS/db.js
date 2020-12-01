const mongoose = require("mongoose");
require("dotenv/config");
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		keepAlive: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Connected");
	})
	.catch((error) => {
		console.log(error);
	});

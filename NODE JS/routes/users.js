const express = require("express");

const router = express.Router();
const User = require("../models/User");

//Retrive all data

router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		// const users = await User.find({}, { orderedItems: { price: 300 } });
		// const users = await User.find({ "orderedItems.orderid": "OD7W6WR" });
		// const users = await User.find({ "orderedItems.orderId": "OD7W6WR" });
		// const users = await User.find({}, { orderedItems: 1 });
		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});

//Search user using email id
router.get("/:email", async (req, res) => {
	try {
		const email = req.params.email;
		const user = await User.findOne({ email: email });
		res.json(user);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		phonenumber: req.body.phonenumber,
		expensedetails: req.body.expensedetails,
	});
	try {
		console.log(user);
		const savedPost = await user.save();
		console.log(savedPost);
		res.json(savedPost);
	} catch (err) {
		res.json({ message: err });
	}
});
router.get("/taskid/:taskid", async (req, res) => {
	try {
		const taskid = req.params.taskid;
		console.log(taskid);
		const users = await User.find({ "expensedetails.id": taskid });
		//console.log(users);
		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});

//Save modification expense id data

router.patch("/update/:email", async (req, res, next) => {
	try {
		const email = req.params.email;
		let updates = req.body;
		console.log(updates);

		const result = await User.findOneAndUpdate({ email: email }, updates);

		res.send({ success: "Completed" });
	} catch (error) {
		console.log(res.json(error));
	}
});

router.patch("/:email", async (req, res, next) => {
	try {
		const email = req.params.email;
		let updates = req.body;
		//console.log(updates);
		if (Object.keys(updates) == "expensedetails") {
			const findone = await User.findOne({ email: email });
			findone.expensedetails.push(updates.expensedetails);
			findone.save();
		} else if (Object.keys(updates) == "category") {
			const findone = await User.findOne({ email: email });
			findone.category.push(updates.category);
			findone.save();
		} else {
			const result = await User.findOneAndUpdate({ email: email }, updates);
		}
		res.send({ success: "Completed" });
	} catch (error) {
		console.log(res.json(error));
	}
});
module.exports = router;

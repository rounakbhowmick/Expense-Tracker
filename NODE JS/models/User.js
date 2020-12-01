const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: String,
		required: true,
	},
	expensedetails: {
		type: Array,
		required: false,
	},
	category: {
		type: Array,
		required: false,
	},
	totalbudget: {
		type: Number,
		required: false,
	},
});
module.exports = mongoose.model("ExpenseeveUsers", PostSchema);

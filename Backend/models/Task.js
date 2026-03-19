const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    userId: String,
    name: String,
    hours: Number,
    priority: String,
    completed: Boolean
});

module.exports = mongoose.model("Task", taskSchema);
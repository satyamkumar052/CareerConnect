const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingJob = new Schema({
    title : {
        type : String,
        required : true,
    },
    company : {
        type : String,
        required :true,
    },
    location : {
        type : String,
        required :true,
    },
    salary: {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    createdBy: {
        type : Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Job = mongoose.model("Job",listingJob);
module.exports = Job;
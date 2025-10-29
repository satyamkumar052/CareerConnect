const mongoose = require("mongoose");
const initData = require("./data.js");
const Job = require("../models/listingJob.js");

// connection with db
main().then(()=>console.log("Connected to db")).catch((err)=>console.log(err));
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/listingjob");
}

// insert to db 
const initDB = async () =>{
    await Job.deleteMany({});
    await Job.insertMany(initData);
    console.log("Data is Added");
};
initDB();
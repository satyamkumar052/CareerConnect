import { connect } from "mongoose";
import initData from "./data.js";
import { deleteMany, insertMany } from "../models/listingJob.js";

// connection with db
main().then(()=>console.log("Connected to db")).catch((err)=>console.log(err));
async function main() {
    await connect("mongodb://127.0.0.1:27017/listingjob");
}

// insert to db 
const initDB = async () =>{
    await deleteMany({});
    await insertMany(initData);
    console.log("Data is Added");
};
initDB();
const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {isLoggedIn, isOwner, validateJob} = require("../middleware.js");
const Job = require("../models/listingJob.js");

// show job
router.get("/", async (req,res)=>{
    const alljobs = await Job.find({});
    res.render("listings/index.ejs",{alljobs});
});

// create job
router.post("/",isLoggedIn,validateJob,wrapAsync(async (req,res)=>{
    let job = new Job(req.body.listing);
    job.createdBy = req.user._id;
    await job.save();
    req.flash("success","New Job created!");
    res.redirect("/jobs");
}));


// new job listing
router.get("/new",isLoggedIn, (req,res)=>{
    res.render("listings/new.ejs");
});


// destroy listing
router.delete("/:id",isLoggedIn,isOwner,wrapAsync( async (req,res)=>{
    let {id} = req.params;
    await Job.findByIdAndDelete(id);
    req.flash("success","Job deleted");
    res.redirect("/jobs");
}));

// show route
router.get("/:id",wrapAsync( async (req,res)=>{
    const {id} = req.params;
    let job = await Job.findById(id).populate("createdBy");
    if(!job) {
        req.flash("error","Job does not exist");
        res.redirect("/jobs");
    }
    res.render("listings/show.ejs",{job});
}));


// render edit form
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    const {id} = req.params;
    let job = await Job.findById(id).populate("createdBy");
    res.render("listings/edit.ejs", {job});
}));

// edit form
router.patch("/:id",isLoggedIn,validateJob,wrapAsync( async (req,res)=>{
    const {id} = req.params;
    let job = await Job.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success","Job updated!");
    res.redirect(`/jobs/${id}`);
}));


module.exports = router;
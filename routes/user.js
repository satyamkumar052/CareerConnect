const passport = require("passport");
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const express = require('express');
const router = express.Router();

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});

router.post("/signup", wrapAsync(async (req,res,next)=>{
    try {
        let { username, email, password } = req.body;
        const newUser = new User({username,email});
        const registerUser = await User.register(newUser, password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", `Registration successful! Welcome, ${registerUser.username}!`)
            res.redirect("/jobs");
        });
    } catch(e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
});

router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash : true }),
  function(req, res) {
    req.flash("success","Welcome back");
    res.redirect("/jobs");
  });

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/jobs");
    });
});

module.exports = router;
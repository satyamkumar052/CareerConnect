const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const passport = require("passport");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const Job = require("./models/listingJob");
const userRouter = require("./routes/user");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const jobRouter = require("./routes/jobRoute");

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/listingjob";
const SESSION_SECRET = process.env.SESSION_SECRET || "mysecretsession";
const PORT = process.env.PORT || 8080;


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended : true }));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// connection with db
main().then(()=>console.log("Connected to db")).catch(err=>console.log(err));
async function main() {
    await mongoose.connect(MONGO_URL);
}

const store = MongoStore.create({
    mongoUrl : MONGO_URL,
    crypto : {
        secret : SESSION_SECRET,
    },
    touchAfter : 24 * 60 * 60,
});

store.on("error", (err)=>{
    console.log("Error in mongo session store", err);
});

const sessionOption = {
    secret : SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    store,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
};



app.use(session(sessionOption)); 
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //

app.use((req,res,next)=>{  // flash message
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
}); 

app.use("/jobs", jobRouter);
app.use("/",userRouter);

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.use((err, req, res, next)=>{
    let {statusCode=400,message="something wrong"} = err;
    res.status(statusCode).send(message);
});


app.get("/",(req,res)=>{
    res.send("Request Received");
});

app.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`);
});
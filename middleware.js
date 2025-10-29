const Job = require("./models/listingJob");
const ExpressError = require("./utils/ExpressError");
const { jobSchema } = require("./schema");

module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in");
        return res.redirect("/login");
    }
    next();
};



module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job.createdBy.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/jobs/${id}`);
  }
  next();
};


module.exports.validateJob = (req, res, next) => {
  const { error } = jobSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

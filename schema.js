const Joi = require('joi');

// will check at backend side if the data from frontend is valid before saving to db

module.exports.jobSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        company : Joi.string().required(),
        location : Joi.string().required(),
        salary : Joi.number().min(0).required(),
        description : Joi.string().required(),
    }).required()
});
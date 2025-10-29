const Joi = require('joi');

module.exports.jobSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        company : Joi.string().required(),
        location : Joi.string().required(),
        salary : Joi.number().min(0).required(),
        description : Joi.string().required(),
    }).required()
});
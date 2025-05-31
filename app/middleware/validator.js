const Joi = require('joi');

exports.registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,}$')) // Password must be at least 6 characters long and alphanumeric
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
});

exports.loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,}$')) // Password must be at least 6 characters long and alphanumeric
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
    }),
});
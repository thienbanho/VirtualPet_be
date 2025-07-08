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

exports.sheltersRegisterSchema = Joi.object({
  companyName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Shelter name must be at least 3 characters long',
      'any.required': 'Shelter name is required',
    }),
  companyEmail: Joi.string()
    .email()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  phone: Joi.string()
    .min(10)
    .max(15)
    .required()
    .messages({
      'string.min': 'Phone number must be at least 10 characters long',
      'any.required': 'Phone number is required',
    }),
  address: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      'string.min': 'Address must be at least 5 characters long',
      'any.required': 'Address is required',
    }),
  business_license: Joi.string()
    .min(5)
    .max(100)
    .required()
    .messages({
      'string.min': 'Business license must be at least 5 characters long',
      'any.required': 'Business license is required',
    }),
});
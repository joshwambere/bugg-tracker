/* eslint-disable no-underscore-dangle */
import Joi from 'joi';
import { config } from 'dotenv';

config();

const _schema = Joi.object().keys({
  bug_title: Joi.string().required().max(70),
  bug_desc: Joi.string().max(670),
  bug_priority: Joi.string().required().max(30),
  bug_status: Joi.string()
});

const _validateBug=(req, res,next)=>{
  const { error } = _schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  return next();
}


module.exports = { _validateBug};
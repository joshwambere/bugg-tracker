import Joi from 'joi';
import model from '../database/models';
import jwt from 'jsonwebtoken';

const _schema = Joi.object().keys({
  names: Joi.string().required().max(70),
  email: Joi.string().required().max(670),
  password: Joi.string().required().min(5),
  user_type: Joi.string()
});

const _validateSignup = async(req,res,next) =>{
  const { error } = _schema.validate(req.body);
  if (error){
    return res.status(400).json({ message: error.details[0].message });
  }else{
    const userEmail=await model.users.findOne({where:{email: req.body.email}})
    userEmail? res.send({message:"email taken"}):next();
    
    
  }
};
const _isLoggedIn=(req,res,next)=>{
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Please log in',

    });
  }
}

module.exports={_isLoggedIn,_validateSignup}
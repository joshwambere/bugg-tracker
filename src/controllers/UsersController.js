import model from '../database/models';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

config();

const loginUser = async (req, res) => {
  try {
    model.users.findOne({where:{email: req.body.email}})
    .then((user)=>{
      if (!user) {
        return res.status(401).json({
          message: res.__('User not found.'),
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.JWT_KEY, { expiresIn: '24h' });
          jwt.verify(token, process.env.JWT_KEY, () => { });
          user.password = undefined;
          res.json({ success: true, user,token: token });
        } else {
          res.status(401).json({ success: false, message: res.status(403).send({message:'email or password is incorect.'}) });
        }
      });
    });
  
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const signupUser=(req,res)=>{
  model.users.create({
    names: req.body.names,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
    user_type: req.body.user_type
  }).then((data) => {
      const token = jwt.sign(JSON.parse(JSON.stringify(data)), process.env.JWT_KEY, { expiresIn: '1h' });
      res.status(201).json({
        message: "User registered",
        user_details: data,
        token: token
      });
    });
};

module.exports = {loginUser, signupUser};



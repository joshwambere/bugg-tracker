import model from '../database/models';
import store from 'store';



const addStudent = async (req, res) => {
  try {
    console.log(req.body);
    if(req.body.StudentId && req.body.names){
      store.set('student', req.body);
      return res.status(201).json({success:true, data:store.get('student')});
    }else{
      return res.status(400).json({success:false});
    }
    
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};



const submitReg = async (req, res) => {
  try {
    if(req.body.registration && req.body.names && req.body.StudentId){
      console.log(req.body)
      await model.Students.create(req.body);
      res.status(201).send({ success: true, message: 'student registred successfuly' });
    } else {
      res.status(400).send({ success: false, error: 'bad request' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error:error});
  }
  return res;
};





module.exports = {addStudent, submitReg};

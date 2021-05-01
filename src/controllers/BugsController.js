import model from '../database/models';



const addBug = async (req, res) => {
  try {
    if(req.body.bug_title && req.body.bug_priority){
      await model.bugs.create(req.body)
      return res.status(201).json({success:true, data:req.body});
    }else{
      return res.status(400).json({success:false, message:"please provide required infos"});
    } 
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getBugs=async(req,res)=>{
  try {
    const bugs = await model.bugs.findAll({include: [
       { model: model.users}
    ]});
    
    return res.status(200).json({ success: true, bugs });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}


const UpdateBugs = async (req, res) => {
  try {
    if(req.body.bug_title && req.body.bug_priority && req.body.bug_status){
      const bug= await model.bugs.update(req.body,{ where: { id: req.params.id } });
      if(bug){
        const data = await model.bugs.findOne({ where: { id: req.params.id } });
        res.status(200).send({
          success: true,
          message: 'bug updated succeddfuly',
          data
        });
      }
    } else {
      res.status(400).send({ success: false, error: 'bad request' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error:error});
  }
  return res;
};

const deleteBug=async(req,res)=>{
  try {
    const bugs = await model.bugs.findOne({where:{id:req.params.id}});
    if (bugs) {
      if(req.user.id==bugs.added_by || req.user.user_type=='admin'){
        await model.bugs.destroy({ where: { id: req.params.id } });
        res.status(200).send({ success: true, message: 'bug deleted successfuly' });
      }else{
        res.status(403).send({ success: true, message: 'You have to be the owner or Adim to delete card' });
      }
      
    } else {
      res.status(404).send({ success: false, error: 'bug not found!' });
    }
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
}

const getSingleBug=async(req,res)=>{
  try {
    const bugs = await model.bugs.findOne({where:{id:req.params.id}});
    return res.status(200).json({ success: true, bugs });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}




module.exports = {addBug, UpdateBugs,getBugs,deleteBug,getSingleBug};

import model from '../database/models';


export const getCourse = async (req, res) => {
  try {
    const _course = await model.courses.findAll();
    return res.status(200).json({ success: true, _course });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


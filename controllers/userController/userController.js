const models = require('../../models')

exports.getUser = async (req, res) => {
  const user = await models.User.findById(req.userData.id);
  return res.status(200).json(user)
}

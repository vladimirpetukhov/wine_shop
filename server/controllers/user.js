const { UserModel } = require('../models');

module.exports = {
  getUsers: (req, res, next) => {
    const { id } = req.params;
    UserModel.find(id ? { _id: id } : {})
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  },
};

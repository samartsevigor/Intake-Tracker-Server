const UserModule = require('../modules/user.module');

const getMe = async (req, res) => {
  try {
    const {userId} = req;
    const user = await UserModule.getUserById(userId);
    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = {
  getMe,
};

const UserModule = require('../modules/user.module');
const AuthService = require('../service/auth.service');

const signup = async (req, res) => {
  try {
    const {email, password} = req.body;
    const existUser = await UserModule.getUserByEmail(email);
    if (existUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    const user = await UserModule.createUser(email, password);
    const token = await AuthService.generateAccessToken(user.id);

    res.json(AuthService.formatUserWithNewToken(user, token));
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went Wrong');
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await UserModule.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    const passwordMatch = await AuthService.comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = await AuthService.generateAccessToken(user.id);

    res.json(AuthService.formatUserWithNewToken(user, token));
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
};

module.exports = {signup, login};

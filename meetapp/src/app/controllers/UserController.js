import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const { name, id, email, provider } = await User.create(req.body);

    return res.json({ name, id, email, provider });
  }
}

export default new UserController();

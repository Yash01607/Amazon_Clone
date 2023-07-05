import express from 'express';
import User from '../models/userModel.js';
import { getToken, isAdmin } from '../util.js';
import { isAuth } from '../util.js';
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/signin', async (req, res) => {
  // console.log(req.body);
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: 'Invalid E-mail or Password.' });
  }
});

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const newUser = await user.save();
  if (newUser) {
    res.send({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: 'Invalid User Data.' });
  }
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: 'User Not Found' });
  }
});

router.put('/profile', isAuth, async (req, res) => {
  const user = await User.findById(req.user.id);
  // console.log(req.body);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    // console.log(updatedUser.password);
    if (updatedUser) {
      res.send({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: getToken(updatedUser),
      });
    } else {
      return res.status(500).send({ msg: 'Error in Updating user' });
    }
  } else {
    return res.status(500).send({ msg: 'User Not found' });
  }
});

router.get('/', isAuth, isAdmin, async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      // console.log(user.email);
      if (user.email === 'admin-yash@agrotech.com') {
        res.status(400).send({ message: 'Cannot Delete An Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ msg: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ msg: 'User not found' });
    }
  })
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin-yash@agrotech.com') {
        res.status(400).send({ message: 'Yash must be an Admin User' });
        return;
      }
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;

      const updatedUser = await user.save();
      res.send({ msg: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ msg: 'user Not found' });
    }
  })
);

export default router;

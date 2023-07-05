import jwt from 'jsonwebtoken';
import config from './config.js';

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  // console.log(req.body);
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(6, token.length);
    // console.log(onlyToken);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: 'INVALID TOKEN' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: 'Token is not supplied' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: 'Admin token is not valid' });
};

export { getToken, isAdmin, isAuth };

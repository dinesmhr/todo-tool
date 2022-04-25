import {
  userloginValidator
} from '../validators/userValidator';
import * as userService from '../services/userService';
import {
  Router
} from 'express';
import * as HttpStatus from 'http-status-codes';
const router = Router();
import {
  verifyRefreshToken,
  generateAccessToken
} from "../utils/jwt";

/**
 * POST /api/login
 */
router.post('/', userloginValidator, (req, res, next) => {
  let login = userService.loginUser(req.body);
  login.then(data => res.status(HttpStatus.CREATED).json({
      data
    }))
    .catch(err => next(err));
});


router.get('/refresh', ensureToken, (req, res, next) => {
  try {
    userService
      .validateRefreshToken(req.token);
    let decoded = verifyRefreshToken(req.token);
    res.json(generateAccessToken(decoded));
  } catch (err) {
    res.sendStatus(403);
  }
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
export default router;

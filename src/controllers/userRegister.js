import { userRegisterValidator } from "../validators/userValidator";
import * as userService from "../services/userService";
import { Router } from "express";
import * as HttpStatus from "http-status-codes";
const router = Router();
/**
 * POST /api/register
 */
router.post('/', userRegisterValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});
export default router;

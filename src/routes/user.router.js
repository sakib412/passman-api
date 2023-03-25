import { Router } from "express";
import { getUser, login, logout, signup } from "../controllers/user.controllers";
import requireAuth from "../middleware/auth";


const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout)
userRouter.get('/me', requireAuth, getUser)

export default userRouter;
import { Router } from "express";
import { login, signup } from "../controllers/user.controllers";


const userRouter = Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);


export default userRouter;
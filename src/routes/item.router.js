import { Router } from "express";
import { getAllItems } from "../controllers/item.controllers";


const itemRouter = Router()
itemRouter.route('/')
    .get(getAllItems)


export default itemRouter
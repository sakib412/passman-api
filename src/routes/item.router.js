import { Router } from "express";
import { createItem, deleteItem, getAllItems } from "../controllers/item.controllers";


const itemRouter = Router()
itemRouter.route('/')
    .get(getAllItems)
    .post(createItem)

itemRouter.route('/:id')
    .delete(deleteItem)


export default itemRouter
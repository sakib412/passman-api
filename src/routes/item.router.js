import { Router } from "express";
import { createItem, deleteItem, getAllItems, updateItem } from "../controllers/item.controllers";


const itemRouter = Router()
itemRouter.route('/')
    .get(getAllItems)
    .post(createItem)

itemRouter.route('/:id')
    .put(updateItem)

    .delete(deleteItem)


export default itemRouter
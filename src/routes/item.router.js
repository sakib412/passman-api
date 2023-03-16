import { Router } from "express";
import { bulkDeleteItem, bulkFolderUpdateItem, createItem, deleteItem, getAllItems, updateItem } from "../controllers/item.controllers";


const itemRouter = Router()
itemRouter.route('/')
    .get(getAllItems)
    .post(createItem)
itemRouter.put("/update-many", bulkFolderUpdateItem)
itemRouter.post('/delete-many', bulkDeleteItem)

itemRouter.route('/:id')
    .put(updateItem)
    .delete(deleteItem)


export default itemRouter
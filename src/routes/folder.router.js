import { Router } from "express";
import { createFolder, deleteFolder, getAllFolders, getFolderById, updateFolder } from "../controllers/folder.controllers";


const folderRouter = Router()
folderRouter.route('/')
    .get(getAllFolders)
    .post(createFolder)

folderRouter.route('/:id')
    .get(getFolderById)
    .put(updateFolder)
    .delete(deleteFolder)


export default folderRouter
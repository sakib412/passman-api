import Item from "../models/Item"
import { errorResponse, successResponse } from "../utils/response"

export const getAllItems = async (req, res) => {
    try {
        let { page = 1, size = 10, folder } = req.query
        page = parseInt(page)
        size = parseInt(size)
        // when auth is done, change owner to req.user.id
        const query = { owner: 1 }
        if (folder && folder !== "null") {
            query.folder = folder
        }
        const totalData = await Item.find().estimatedDocumentCount()
        const data = await Item.find(query).sort({ updatedAt: -1 }).skip((page - 1) * size).limit(size).exec()

        const totalPage = Math.ceil(totalData / size)
        const results = {
            currentPage: page,
            totalData,
            totalPage,
            prevPage: page <= 1 ? null : page - 1,
            nextPage: page >= totalPage ? null : page + 1,
            data
        }
        return res.json(successResponse(results))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}


export const createItem = async (req, res) => {
    try {
        const { name, username, password, url, note, folder } = req.body;
        const item = await Item.create({
            name,
            username,
            password,
            url,
            note,
            folder,
        });
        return res.status(201).json(successResponse(item));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        if (!item) {
            return res.status(404).json(errorResponse("Not found!"))
        }
        return res.status(200).json(successResponse(item))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const updateItem = async (req, res) => {
    try {
        const item = Item.findById(req.params.id)
        if (!item) {
            return res.status(404).json(errorResponse('Not found'))
        }

        const { name, username, password, url, note, folder } = req.body;
        const newItem = {}
        if (name) {
            newItem.name = name
        }
        if (username) {
            newItem.username = username
        }
        if (password) {
            newItem.password = password
        }
        if (url) {
            newItem.url = url
        }
        if (note) {
            newItem.note = note
        }
        // make sure to pass folder value from frontend and folder value can be null
        newItem.folder = folder


        const updatedItem = await Item.findOneAndUpdate({ _id: req.params.id }, newItem, { new: true })

        return res.status(200).json(successResponse(updatedItem))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const bulkDeleteItem = async (req, res) => {
    try {
        const { ids } = req.body
        const deletedItems = await Item.deleteMany({ _id: { $in: ids } })
        return res.status(200).json(successResponse(deletedItems))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}


export const bulkFolderUpdateItem = async (req, res) => {
    try {
        const { ids, folder } = req.body
        const updatedItems = await Item.updateMany({ _id: { $in: ids } }, { folder }, { new: true })
        return res.status(200).json(successResponse(updatedItems))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}
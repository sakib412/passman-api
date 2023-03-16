import { trim } from "lodash"
import Folder from "../models/Folder"
import { errorResponse, successResponse } from "../utils/response"

export const getAllFolders = async (req, res) => {
    try {
        let { page = 1, size = 10 } = req.query
        page = parseInt(page)
        size = parseInt(size)
        const query = {}
        const totalData = await Folder.find().estimatedDocumentCount()
        const data = await Folder.find(query).sort({ updatedAt: -1 }).skip((page - 1) * size).limit(size).exec()

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


export const createFolder = async (req, res) => {
    try {
        const { name } = req.body;
        const folder = await Folder.create({
            name: trim(name)
        });
        return res.status(201).json(successResponse(folder));
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const updateFolder = async (req, res) => {
    try {
        const { name } = req.body;
        const folder = await Folder.findByIdAndUpdate(req.params.id, { name: trim(name) }, { new: true })
        if (!folder) {
            return res.status(404).json(errorResponse("Not found!"))
        }
        return res.status(200).json(successResponse(folder))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const deleteFolder = async (req, res) => {
    try {
        const folder = await Folder.findByIdAndDelete(req.params.id)
        if (!folder) {
            return res.status(404).json(errorResponse("Not found!"))
        }
        return res.status(200).json(successResponse(folder))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}

export const getFolderById = async (req, res) => {
    try {
        const folder = await Folder.findById(req.params.id)
        if (!folder) {
            return res.status(404).json(errorResponse("Not found!"))
        }
        return res.status(200).json(successResponse(folder))
    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}
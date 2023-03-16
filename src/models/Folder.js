import { Schema, model, models } from "mongoose";
import { FOLDER } from "./collectionName";

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Folder = models.Folder || model(FOLDER, FolderSchema);

export default Folder;
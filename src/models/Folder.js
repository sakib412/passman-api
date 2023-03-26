import { Schema, model, models } from "mongoose";
import { FOLDER, USER } from "./collectionName";

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: USER,
    }

}, { timestamps: true });

const Folder = models.Folder || model(FOLDER, FolderSchema);

export default Folder;
import { Schema, model, models } from "mongoose";
import { FOLDER, ITEM, USER } from "./collectionName";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    username: {
        type: String,
    },

    password: {
        type: String,
    },

    url: [{
        type: String,
    }],

    note: {
        type: String,
    },

    folder: {
        type: Schema.Types.ObjectId,
        null: true,
        ref: FOLDER,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: USER
    },
}, { timestamps: true });

const Item = models.Item || model(ITEM, ItemSchema);

export default Item;
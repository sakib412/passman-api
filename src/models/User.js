import { Schema, model, models } from "mongoose";
import { USER } from "./collectionName";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },

    password: {
        type: String,
    },

}, { timestamps: true });

const User = models.User || model(USER, UserSchema);

export default User;
import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { USER } from "./collectionName";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },

    password: {
        type: String
    },

}, { timestamps: true });

// Hash password before save
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err)
        }
        this.password = hash
        next()
    })
})



// Check plain password to hashed password
userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }
            resolve(same)
        })
    })
}

const User = models.User || model(USER, userSchema);

export default User;
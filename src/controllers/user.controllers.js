import User from "../models/User";
import { errorResponse, successResponse } from "../utils/response"

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json(errorResponse("Missing username or password"))
        }
        const user = await User.create({
            username,
            password,
        });
        return res.status(201).json(successResponse(user))

    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json(errorResponse("Missing username or password"))
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json(errorResponse("Incorrect username or password"))
        }
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(404).json(errorResponse("Incorrect username or password"))
        }
        req.session.userId = user._id;

        res.status(200).json(successResponse("Login successful!"))


    } catch (err) {
        return res.status(500).json(errorResponse(err.message));
    }

}
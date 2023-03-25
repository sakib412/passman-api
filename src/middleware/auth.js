import User from "../models/User";
import { errorResponse } from "../utils/response";

export default async function requireAuth(req, res, next) {
    if (!req?.session?.userId) {
        return res.status(403).json(errorResponse({ message: 'Access forbidden! please login and try again' }));
    }
    req.user = await User.findById(req.session.userId);
    if (!req.user) {
        return res.status(403).json(errorResponse({ message: 'Access forbidden! please login and try again' }));
    }

    next();

}
import User from "../models/User";
import { errorResponse } from "../utils/response";

export default async function requireAuth(req, res, next) {
    if (!req?.session?.userId) {
        return res.status(401).json(errorResponse('Unauthorized'));
    }
    req.user = await User.findById(req.session.userId).select('-password');
    if (!req.user) {
        return res.status(401).json(errorResponse('Unauthorized'));
    }

    next();

}
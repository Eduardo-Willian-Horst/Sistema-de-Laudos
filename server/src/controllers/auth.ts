import {Request, Response} from "express";
import jwt from "jsonwebtoken";
class Authentication {
    async hasAuthorization(req: Request, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization
        if (!bearerHeader) {
            return res.status(403).json({auth: false, message: 'Nenhum token fornecido.'})
        }
        const bearer = bearerHeader.split(' ')[1]
        jwt.verify(bearer, process.env.TOKEN, function (err, decoded) {
            if (err) return res.status(500).json({
                auth: false,
                message: 'Failed to authenticate token.',
                error: err
            });
            req.params.token = bearer;
            next();
        });
    }
}
export default new Authentication()
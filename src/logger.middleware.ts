import { Request, Response, NextFunction } from 'express';
import { inspect } from 'util';
/* functional middleware */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(`Requets : ${inspect(
        {
            headers: {
                ...req.headers
            },
            body: req.body || req.params,
            method: req.method,
            originalUrl: req.originalUrl
        }, {
        depth: 6
    }
    )}`);
    next();
}
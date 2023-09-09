import express, { Request, Response } from "express";
import 'dotenv/config';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.type('json')
    res.send({"Hello": "world"});
});
export default router;

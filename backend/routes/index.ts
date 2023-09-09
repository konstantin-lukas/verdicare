import express, { Request, Response } from 'express';
import { resolve } from 'path';
import 'dotenv/config';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(resolve('./public/index.html'));
});
export default router;

import express, { Request, Response } from "express";
import 'dotenv/config';
const server = express();
const port = parseInt(process.env.EXPRESS_PORT || '3000');
import indexRouter from './routes/index';
import apiRouter from './routes/api';

server.use('/api', apiRouter);
server.use('/', indexRouter);
server.use(express.static('public'));

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
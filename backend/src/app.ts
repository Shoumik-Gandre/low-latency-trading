import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';

export const app = express();
export const html = __dirname + '/public/';

app
	.use(bodyParser.urlencoded({ extended: true }))
	.use(cors())
	.use(express.json())
	.use(express.static(html))
	.use('/', routes)


export const server = createServer(app);
export const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173"
	}
});
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express, { Express, Request, RequestHandler, Response } from 'express';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import path from 'path';
import corsOptions from './config/corsOptions';
import connectDB from './config/dbConnection';
import employeesRouter from './routes/api/employees';
import loginRouter from './routes/login';
import logoutRouter from './routes/logout';
import refreshRouter from './routes/refresh';
import registerRouter from './routes/register';

import http from 'http';
const debug = require('debug')('yalantis-server:server');

import mongoose from 'mongoose';
import credentials from './middleware/credentials';
import verifyJWT from './middleware/verifyJWT';

const app: Express = express();

connectDB();
app.use(logger('dev'));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', registerRouter);
app.use('/api', loginRouter);
app.use('/api', logoutRouter);
app.use('/api', refreshRouter);

app.use(verifyJWT as RequestHandler);
app.use('/api/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3500');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB!');
	server.listen(port);
	server.on('error', onError);
	server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
	debug('Listening on ' + bind);
}

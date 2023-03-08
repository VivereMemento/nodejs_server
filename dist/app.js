"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const employees_1 = __importDefault(require("./routes/api/employees"));
const login_1 = __importDefault(require("./routes/login"));
const logout_1 = __importDefault(require("./routes/logout"));
const refresh_1 = __importDefault(require("./routes/refresh"));
const register_1 = __importDefault(require("./routes/register"));
const http_1 = __importDefault(require("http"));
const debug = require('debug')('yalantis-server:server');
const mongoose_1 = __importDefault(require("mongoose"));
const credentials_1 = __importDefault(require("./middleware/credentials"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const app = (0, express_1.default)();
(0, dbConnection_1.default)();
app.use((0, morgan_1.default)('dev'));
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials_1.default);
// Cross Origin Resource Sharing
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', register_1.default);
app.use('/api', login_1.default);
app.use('/api', logout_1.default);
app.use('/api', refresh_1.default);
app.use(verifyJWT_1.default);
app.use('/api/employees', employees_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res) {
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
var server = http_1.default.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB!');
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
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
function onError(error) {
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
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    debug('Listening on ' + bind);
}

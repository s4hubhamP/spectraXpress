"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const addMorganTokens_1 = __importDefault(require("./utils/addMorganTokens"));
const routes_1 = __importDefault(require("./routes"));
const error_1 = __importDefault(require("./utils/error"));
(0, addMorganTokens_1.default)(morgan_1.default);
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*', maxAge: 300 }));
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
if (process.env.NODE_ENV === 'production') {
    app.use((0, morgan_1.default)('combined'));
}
else if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)((tokens, req, res) => [
        tokens.method(req, res),
        tokens.status(req, res),
        tokens.url(req, res),
        tokens.body(req, res),
    ].join(' | ')));
}
app.use('/api', routes_1.default);
app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' }).send();
});
app.use(error_1.default);
app.listen(process.env.PORT, async () => {
    console.log(`🚀 App listening on the port ${process.env.PORT}`);
});
const gracefulShutdown = async () => {
    console.log('Gracefully shutting down');
    process.exit();
};
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown);

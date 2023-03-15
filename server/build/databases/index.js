"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
if (!MONGO_HOST || !MONGO_PORT || !MONGO_DATABASE)
    throw new Error('Missing environment variables.');
const db = {
    primary: {
        url: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
    },
};
async function connect() {
    try {
        await mongoose_1.default.connect(db.primary.url);
        console.log('🟢 Database is connected.');
    }
    catch (error) {
        console.error(`🔴 Unable to connect to the database: ${error}.`);
        process.exit(1);
    }
}
exports.connect = connect;
async function disconnect() {
    await mongoose_1.default
        .disconnect()
        .then(() => {
        console.log('🟢 Mongoose disconnected through app termination');
        process.exit(0);
    })
        .catch((err) => {
        console.log('🔴 Mongoose could not be disconnected through app termination', err);
        process.exit(1);
    });
}
exports.disconnect = disconnect;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function errorMiddleware(error, _req, res, next) {
    try {
        console.log(`${error.message}`);
        res.status(500).json({ message: error.message });
    }
    finally {
        next(error);
    }
}
exports.default = errorMiddleware;

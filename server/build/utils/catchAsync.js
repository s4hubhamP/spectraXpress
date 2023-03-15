"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (callback) => {
    return (req, res, next) => {
        callback(req, res, next).catch(next);
    };
};

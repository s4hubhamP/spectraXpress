"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addMorganTokens(morgan) {
    morgan.token('body', req => 'Body: ' + JSON.stringify(req.body));
    morgan.token('query', req => 'Query: ' + JSON.stringify(req.query));
    morgan.token('params', req => 'Params: ' + JSON.stringify(req.params));
}
exports.default = addMorganTokens;

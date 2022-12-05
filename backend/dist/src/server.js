"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users/users"));
const cors_1 = __importDefault(require("cors"));
function createServer(db) {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: '*',
    }));
    app.use(express_1.default.json());
    app.use('/', (0, users_1.default)(db));
    return app;
}
exports.createServer = createServer;
//# sourceMappingURL=server.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../../handlers/users"));
const getAllUsers = users_1.default.getAllUsers;
const updateUser = users_1.default.updateUser;
const createUser = users_1.default.createUser;
const logInUser = users_1.default.logInUser;
function userRoutes(db) {
    const router = (0, express_1.Router)();
    router.get('/allusers', getAllUsers(db));
    router.patch('/:userId/:checkInStatus', updateUser(db));
    router.post('/users', createUser(db));
    router.post('/logInUser', logInUser(db));
    return router;
}
exports.default = userRoutes;
//# sourceMappingURL=users.js.map
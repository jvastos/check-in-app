"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const userHandlers = {
    getAllUsers: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield db.collection('users').find({}).toArray();
        res.status(200).send(users);
    }),
    updateUser: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        const checkInStatus = req.params.checkInStatus === 'true';
        const foundUser = yield db
            .collection('users')
            .updateOne({ _id: new mongodb_1.ObjectId(`${userId}`) }, { $set: { isCheckedIn: checkInStatus } });
        res.status(200).send(foundUser);
    }),
    createUser: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = Object.assign(Object.assign({}, req.body), { isCheckedIn: false });
        const foundUser = yield db.collection('users').insertOne(user);
        res.status(200).send(user);
    }),
};
exports.default = userHandlers;
//# sourceMappingURL=users.js.map
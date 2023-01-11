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
const userControllers = {
    getAllUsers: (db) => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield db.collection('users').find({}).toArray();
        return allUsers;
    }),
    findUser: (db, reqUser) => __awaiter(void 0, void 0, void 0, function* () {
        const foundUser = yield db.collection('users').findOne({ username: `${reqUser.username}` });
        return foundUser;
    }),
    updateUser: (db, userCheckInInfo, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db
            .collection('users')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(`${userCheckInInfo.userId}`) }, { $set: { isCheckedIn: userCheckInInfo.checkInStatus } }, { returnDocument: 'after' }, (err, documents) => {
            res.status(200);
            res.send({ error: err, affected: documents });
        });
    }),
};
exports.default = userControllers;
//# sourceMappingURL=users.js.map
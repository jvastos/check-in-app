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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userHandlers = {
    getAllUsers: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield db.collection('users').find({}).toArray();
        res.status(200).send(users);
    }),
    logInUser: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reqUser = {
            username: req.body.username,
            password: req.body.password,
        };
        const user = yield db.collection('users').findOne({ username: `${reqUser.username}` });
        const passwordMatch = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (passwordMatch) {
            res.status(200).send(user);
        }
        else {
            res.status(403).send(`Password doesn't match.`);
        }
    }),
    updateUser: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const userId = req.params.userId;
        const checkInStatus = req.params.checkInStatus === 'true';
        const foundUser = yield db
            .collection('users')
            .findOneAndUpdate({ _id: new mongodb_1.ObjectId(`${userId}`) }, { $set: { isCheckedIn: checkInStatus } }, { returnDocument: 'after' }, (err, documents) => {
            res.send({ error: err, affected: documents });
            res.status(200);
        });
    }),
    createUser: (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
        const user = {
            username: req.body.username,
            password: hashedPassword,
            isCheckedIn: false,
        };
        const foundUser = yield db.collection('users').insertOne(user);
        res.status(200).send(user);
    }),
};
exports.default = userHandlers;
//# sourceMappingURL=users.js.map
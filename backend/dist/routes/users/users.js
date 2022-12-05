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
const express_1 = require("express");
// Getting all the public repos from a specific user.
// The function gets the username through a query in the request's url.
const getAllUsers = (db) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield db.collection('users').find({}).toArray();
    console.log(users);
    res.send(users);
});
/* getAllUsers: async () => {
    const users = await client.db(dbName).collection('usersTest').find({}).toArray();
    return users;
  }, */
function userRoutes(db) {
    const router = (0, express_1.Router)();
    router.get('/allusers', getAllUsers(db));
    return router;
}
exports.default = userRoutes;
//# sourceMappingURL=users.js.map
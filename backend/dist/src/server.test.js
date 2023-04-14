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
describe('Testing that API:', () => {
    it('Gets all users from DB.', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch('https://checkin-app-api.fly.dev/allusers');
        const parsedResponse = yield response.json();
        expect(response.status).toBe(200);
        parsedResponse.forEach((i) => {
            expect(i).toHaveProperty('_id');
            expect(i).toHaveProperty('password');
            expect(i).toHaveProperty('isCheckedIn');
            expect(i).toHaveProperty('username');
        });
    }));
    it('Checks in a user.', () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield fetch('https://checkin-app-api.fly.dev/allusers');
        const parsedAllUsers = yield allUsers.json();
        const randomUser = parsedAllUsers[0];
        try {
            const checkInUserRes = yield fetch(`https://checkin-app-api.fly.dev/${randomUser._id}/${!randomUser.isCheckedIn}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const checkedInUser = yield checkInUserRes.json();
            expect(checkInUserRes.status).toBe(200);
            expect(checkedInUser.affected.value.isCheckedIn).toBe(!randomUser.isCheckedIn);
        }
        finally {
            yield fetch(`https://checkin-app-api.fly.dev/${randomUser._id}/${randomUser.isCheckedIn}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        }
    }));
    it('Logs in a user.', () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield fetch('https://checkin-app-api.fly.dev/allusers');
        const parsedAllUsers = yield allUsers.json();
        const jUser = parsedAllUsers.find((i) => i.username === 'j');
        const body = {
            username: 'j',
            password: 'j',
        };
        const stringBody = JSON.stringify(body);
        const logInUserRes = yield fetch('https://checkin-app-api.fly.dev/logInUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: stringBody,
        });
        const loggedInUser = yield logInUserRes.json();
        expect(logInUserRes.status).toBe(200);
        expect(loggedInUser._id).toBe(jUser._id);
    }));
});
//# sourceMappingURL=server.test.js.map
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
        const response = yield fetch('https://checkin-app-backend.fly.dev/allusers');
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
        const allUsers = yield fetch('https://checkin-app-backend.fly.dev/allusers');
        const parsedAllUsers = yield allUsers.json();
        const randomUser = parsedAllUsers[0];
        console.log('random user original state: ', randomUser);
        try {
            const checkInUserRes = yield fetch(`https://checkin-app-backend.fly.dev/${randomUser._id}/${!randomUser.isCheckedIn}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const checkedInUser = yield checkInUserRes.json();
            console.log('random user state after update: ', checkedInUser.affected.value);
            expect(checkInUserRes.status).toBe(200);
            expect(checkedInUser.affected.value.isCheckedIn).toBe(!randomUser.isCheckedIn);
        }
        finally {
            yield fetch(`https://checkin-app-backend.fly.dev/${randomUser._id}/${randomUser.isCheckedIn}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        }
    }));
});
//# sourceMappingURL=server.test.js.map
import { User } from '../types';

describe('Testing that API:', () => {
	it('Gets all users from DB.', async () => {
		const response = await fetch('https://checkin-app-api.fly.dev/allusers');
		const parsedResponse = await response.json();
		expect(response.status).toBe(200);
		parsedResponse.forEach((i: User) => {
			expect(i).toHaveProperty('_id');
			expect(i).toHaveProperty('password');
			expect(i).toHaveProperty('isCheckedIn');
			expect(i).toHaveProperty('username');
		});
	});

	it('Checks in a user.', async () => {
		const allUsers = await fetch('https://checkin-app-api.fly.dev/allusers');
		const parsedAllUsers = await allUsers.json();
		const randomUser = parsedAllUsers[0];

		try {
			const checkInUserRes = await fetch(`https://checkin-app-api.fly.dev/${randomUser._id}/${!randomUser.isCheckedIn}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const checkedInUser = await checkInUserRes.json();
			expect(checkInUserRes.status).toBe(200);
			expect(checkedInUser.affected.value.isCheckedIn).toBe(!randomUser.isCheckedIn);
		} finally {
			await fetch(`https://checkin-app-api.fly.dev/${randomUser._id}/${randomUser.isCheckedIn}`, {
				method: 'PATCH',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
		}
	});

	it('Logs in a user.', async () => {
		const allUsers = await fetch('https://checkin-app-api.fly.dev/allusers');
		const parsedAllUsers = await allUsers.json();
		const jUser = parsedAllUsers.find((i: any) => i.username === 'j');

		const body = {
			username: 'j',
			password: 'j',
		};

		const stringBody = JSON.stringify(body);

		const logInUserRes = await fetch('https://checkin-app-api.fly.dev/logInUser', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: stringBody,
		});
		const loggedInUser = await logInUserRes.json();
		expect(logInUserRes.status).toBe(200);
		expect(loggedInUser._id).toBe(jUser._id);
	});
});

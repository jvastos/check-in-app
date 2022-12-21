import { User } from '../types';

describe('Testing that API:', () => {
  it('Gets all users from DB.', async () => {
    const response = await fetch('https://checkin-app-backend.fly.dev/allusers');
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
    const allUsers = await fetch('https://checkin-app-backend.fly.dev/allusers');
    const parsedAllUsers = await allUsers.json();
    const randomUser = parsedAllUsers[0];

    try {
      const checkInUserRes = await fetch(
        `https://checkin-app-backend.fly.dev/${randomUser._id}/${!randomUser.isCheckedIn}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      const checkedInUser = await checkInUserRes.json();
      expect(checkInUserRes.status).toBe(200);
      expect(checkedInUser.affected.value.isCheckedIn).toBe(!randomUser.isCheckedIn);
    } finally {
      await fetch(
        `https://checkin-app-backend.fly.dev/${randomUser._id}/${randomUser.isCheckedIn}`,
        {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  });
});

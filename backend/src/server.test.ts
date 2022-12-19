describe('Testing API', () => {
  it('Should get all users from the DB.', async () => {
    const baseUser = {
      _id: '638df42e6ae18e0e039a2aa0',
      password: 'abc123',
      isCheckedIn: false,
      username: 'crazy_goat35',
    };
    const response = await fetch('https://checkin-app-backend.fly.dev/allusers');
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    expect(response.status).toBe(200);
    expect(parsedResponse).toContainEqual(baseUser);
  });
});

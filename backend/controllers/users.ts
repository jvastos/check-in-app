import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const userControllers = {
  getAllUsers: async (db: any) => {
    const allUsers = await db.collection('users').find({}).toArray();
    return allUsers;
  },
};

export default userControllers;

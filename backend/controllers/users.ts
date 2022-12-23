import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

interface IUserInfoBasic {
  username: string;
  password: string;
}

const userControllers = {
  getAllUsers: async (db: any) => {
    const allUsers = await db.collection('users').find({}).toArray();
    return allUsers;
  },
  findUser: async (db: any, reqUser: IUserInfoBasic) => {
    const foundUser = await db.collection('users').findOne({ username: `${reqUser.username}` });
    return foundUser;
  },
};

export default userControllers;

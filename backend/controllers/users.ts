import { ObjectId } from 'mongodb';

interface IUserInfoBasic {
  username: string;
  password: string;
}

interface IUserCheckInInfo {
  userId: string;
  checkInStatus: boolean;
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
  updateUser: async (db: any, userCheckInInfo: IUserCheckInInfo, res: any) => {
    await db
      .collection('users')
      .findOneAndUpdate(
        { _id: new ObjectId(`${userCheckInInfo.userId}`) },
        { $set: { isCheckedIn: userCheckInInfo.checkInStatus } },
        { returnDocument: 'after' },
        (err: any, documents: any) => {
          res.status(200);
          res.send({ error: err, affected: documents });
        }
      );
  },
};

export default userControllers;

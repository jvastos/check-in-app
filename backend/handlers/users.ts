import { ObjectId } from 'mongodb';

const userHandlers = {
  getAllUsers: (db: any) => async (req: any, res: any) => {
    const users = await db.collection('users').find({}).toArray();
    res.status(200).send(users);
  },
  updateUser: (db: any) => async (req: any, res: any) => {
    const userId = req.params.userId;
    const checkInStatus = req.params.checkInStatus === 'true';

    const foundUser = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(`${userId}`) }, { $set: { isCheckedIn: checkInStatus } });
    res.status(200).send(foundUser);
  },
  createUser: (db: any) => async (req: any, res: any) => {
    const user = {
      ...req.body,
      isCheckedIn: false,
    };

    const foundUser = await db.collection('users').insert(user);
    res.status(200).send(req.body);
  },
};

export default userHandlers;

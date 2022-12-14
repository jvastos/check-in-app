import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

const userHandlers = {
  getAllUsers: (db: any) => async (req: any, res: any) => {
    const users = await db.collection('users').find({}).toArray();
    res.status(200).send(users);
  },
  logInUser: (db: any) => async (req: any, res: any) => {
    const reqUser = {
      username: req.body.username,
      password: req.body.password,
    };
    const user = await db.collection('users').findOne({ username: `${reqUser.username}` });

    const comparedPassword = await bcrypt.compare(req.body.password, user.password);
    if (comparedPassword) {
      res.status(200).send(user);
    } else {
      res.status(403).send('Password doesn not match.');
    }
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const user = {
      username: req.body.username,
      password: hashedPassword,
      isCheckedIn: false,
    };

    const foundUser = await db.collection('users').insertOne(user);
    res.status(200).send(user);
  },
};

export default userHandlers;

import bcrypt from 'bcrypt';
import userControllers from '../controllers/users';

const getAllUsers = userControllers.getAllUsers;
const findUser = userControllers.findUser;
const updateUser = userControllers.updateUser;

const userHandlers = {
	getAllUsers: (db: any) => async (req: any, res: any) => {
		const allUsers = await getAllUsers(db);
		res.status(200).send(allUsers);
	},
	logInUser: (db: any) => async (req: any, res: any) => {
		const reqUser = {
			username: req.body.username,
			password: req.body.password,
		};
		const user = await findUser(db, reqUser);

		const passwordMatch = await bcrypt.compare(req.body.password, user.password);
		if (passwordMatch) {
			res.status(200).send(user);
		} else {
			res.status(403).send(`Password doesn't match.`);
		}
	},
	updateUser: (db: any) => async (req: any, res: any) => {
		const userId = req.params.userId;
		const checkInStatus = req.params.checkInStatus === 'true';

		const userCheckInInfo = {
			userId,
			checkInStatus,
		};

		const foundUser = await updateUser(db, userCheckInInfo, res);
	},
	createUser: (db: any) => async (req: any, res: any) => {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
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

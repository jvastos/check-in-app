import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
	isCheckedIn: boolean;
	toggleIsCheckedIn: () => void;
	userIsLoggedIn: boolean;
	setUserIsLoggedIn: (userLogInStatus: boolean) => void;
	checkedInUsers: string[];
	setCheckedInUsers: (checkedInUsers: string[]) => void;
	username: string;
	setUserName: (username: string) => void;
	userId: string;
	setUserId: (userId: string) => void;
	password: string;
	setPassword: (username: string) => void;
	usernameIsTaken: boolean;
	setUsernameIsTaken: (usernameStatus: boolean) => void;
	usernameStatusMessage: string;
	setUsernameStatusMessage: (message: string) => void;
	passwordStatusMessage: string;
	setPasswordStatusMessage: (message: string) => void;
}

export const userStateStore = create<UserState>()(
	devtools(
		(set) => ({
			isCheckedIn: false,
			toggleIsCheckedIn: () => set((state) => ({ isCheckedIn: !state.isCheckedIn })),
			userIsLoggedIn: false,
			setUserIsLoggedIn: (userLogInStatus) => set({ userIsLoggedIn: userLogInStatus }),
			checkedInUsers: [],
			setCheckedInUsers: (checkedInUsers) => set({ checkedInUsers: checkedInUsers }),
			username: '',
			setUserName: (username) => set({ username: username }),
			userId: '',
			setUserId: (userId) => set({ userId: userId }),
			password: '',
			setPassword: (password) => set({ password: password }),
			usernameIsTaken: false,
			setUsernameIsTaken: (usernameStatus) => set({ usernameIsTaken: usernameStatus }),
			usernameStatusMessage: '',
			setUsernameStatusMessage: (message) => set({ usernameStatusMessage: message }),
			passwordStatusMessage: '',
			setPasswordStatusMessage: (message) => set({ passwordStatusMessage: message }),
		}),
		{ name: 'user-state-store' }
	)
);

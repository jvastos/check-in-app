import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  isCheckedIn: boolean;
  setIsCheckedIn: () => void;
  checkedInUsers: string[];
  setCheckedInUsers: (checkedInUsers: string[]) => void;
  username: string;
  setUserName: (username: string) => void;
  password: string;
  setPassword: (username: string) => void;
  usernameIsTaken: boolean;
  setUsernameIsTaken: (usernameStatus: boolean) => void;
}

export const userStateStore = create<UserState>()(
  devtools(
    (set) => ({
      isCheckedIn: false,
      setIsCheckedIn: () => set((state) => ({ isCheckedIn: !state.isCheckedIn })),
      checkedInUsers: [],
      setCheckedInUsers: (checkedInUsers) => set({ checkedInUsers: checkedInUsers }),
      username: '',
      setUserName: (username) => set({ username: username }),
      password: '',
      setPassword: (password) => set({ password: password }),
      usernameIsTaken: false,
      setUsernameIsTaken: (usernameStatus) => set({ usernameIsTaken: usernameStatus }),
    }),
    { name: 'user-state-store' }
  )
);

import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserState {
  isCheckedIn: boolean;
  setIsCheckedIn: () => void;
  checkedInUsers: string[];
  setCheckedInUsers: (checkedInUsers: string[]) => void;
  username: string;
  setUserName: (username: string) => void;
  usernameIsAvailable: boolean;
  setUsernameToAvailable: () => void;
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
      usernameIsAvailable: false,
      setUsernameToAvailable: () => set({ usernameIsAvailable: true }),
    }),
    { name: 'user-state-store' }
  )
);

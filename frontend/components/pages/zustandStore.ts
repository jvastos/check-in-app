import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface CheckInState {
  isCheckedIn: boolean;
  setIsCheckedIn: () => void;
  checkedInUsers: string[];
  setCheckedInUsers: (checkedInUsers: string[]) => void;
}

export const userStateStore = create<CheckInState>()(
  devtools(
    (set) => ({
      isCheckedIn: false,
      setIsCheckedIn: () => set((state) => ({ isCheckedIn: !state.isCheckedIn })),
      checkedInUsers: [],
      setCheckedInUsers: (checkedInUsers) => set({ checkedInUsers: checkedInUsers }),
    }),
    { name: 'user-state-store' }
  )
);

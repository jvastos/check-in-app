import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface CheckInState {
  isCheckedIn: boolean;
  checkInToggle: (isCheckedIn: boolean) => void;
}

export const UseCheckInState = create<CheckInState>()(
  devtools(
    (set) => ({
      isCheckedIn: false,
      checkInToggle: (isCheckedIn) =>
        set(isCheckedIn === false ? { isCheckedIn: true } : { isCheckedIn: false }),
    }),
    { name: 'use-checkin-storage' }
  )
);

interface UsersState {
  checkedInUsers: string[];
  setCheckedInUsers: (checkedInUsers: string[]) => void;
}

export const checkedInUsersState = create<UsersState>()(
  devtools(
    (set) => ({
      checkedInUsers: [],
      setCheckedInUsers: (checkedInUsers) => set({ checkedInUsers: checkedInUsers }),
    }),
    { name: 'use-checked-in-users-storage' }
  )
);

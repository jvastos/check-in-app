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

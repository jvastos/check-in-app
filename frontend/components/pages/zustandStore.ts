import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface CheckInState {
  isCheckedIn: boolean;
  checkIn: () => void;
}

const UseCheckInState = create<CheckInState>()(
  devtools(
    (set) => ({
      isCheckedIn: false,
      checkIn: () => set({ isCheckedIn: true }),
    }),
    { name: 'use-checkin-storage' }
  )
);

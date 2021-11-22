export interface MeetingDay {
  date: Date;
  slots: Slot[];
}

export interface Slot {
  start: Time;
  end: Time;
  unit?: number;
}

export interface Time {
  hour: number;
  minutes: number;
}
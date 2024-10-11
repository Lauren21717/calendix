export type FromTo = {
    from: String;
    to: String;
    active: boolean;
};

export type WeekdayName = 'monday' | 'tuesday'
    | 'wednesday' | 'thursday' | 'friday'
    | 'saturday' | 'sunday';

export type BookingTimes = {} | Record<WeekdayName, FromTo>;
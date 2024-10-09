import mongoose, { model, models, Schema } from "mongoose";

const FromToSchema = new mongoose.Schema({
    from: String,
    to: String,
});

type FromTo = {
    from: String,
    to: String,
};

export type WeekdayName = 'monday' | 'tuesday'
    | 'wednesday' | 'thursday' | 'friday'
    | 'saturday' | 'sunday';

type EventType = {
    email: string;
    title: string;
    description: string;
    length: number;
    bookingTimes: Record<WeekdayName, FromTo>;
}

const BookingSchema = new Schema<WeekdayName, FromTo>({
    monday: FromToSchema,
    tuesday: FromToSchema,
    wednesday: FromToSchema,
    thursday: FromToSchema,
    friday: FromToSchema,
    saturday: FromToSchema,
    sunday: FromToSchema,
});

const EventTypeSchema = new Schema<EventType>({
    email: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
}, {
    timestamps: true,
});

export const EventTypeModel = models?.EventType || model<EventType>('EventType', EventTypeSchema);
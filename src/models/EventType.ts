import { BookingTimes, FromTo, WeekdayName } from "@/libs/types";
import mongoose, { Document, Model, model, models, Schema } from "mongoose";

const FromToSchema = new mongoose.Schema({
    from: String,
    to: String,
    active: Boolean,
});


export interface IEventType extends Document {
    email: string;
    title: string;
    description: string;
    length: number;
    bookingTimes: BookingTimes;
    createdAt: Date;
    updateAt: Date;
}

const BookingSchema = new Schema<Record<WeekdayName, FromTo>>({
    monday: FromToSchema,
    tuesday: FromToSchema,
    wednesday: FromToSchema,
    thursday: FromToSchema,
    friday: FromToSchema,
    saturday: FromToSchema,
    sunday: FromToSchema,
});

const EventTypeSchema = new Schema<IEventType>({
    email: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
}, {
    timestamps: true,
});

export const EventTypeModel = models?.EventType as Model<IEventType> || model<IEventType>('EventType', EventTypeSchema);
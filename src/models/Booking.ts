import { Document, model, models, Schema } from "mongoose";

interface IBooking extends Document {
    guestName: string;
    guestEmail: string;
    guestNotes: string;
    when: Date;
    eventTypeId: string;
}

const BookingSchema = new Schema({
    guestName: String,
    guestEmail: String,
    guestNotes: String,
    when: Date,
    eventTypeId: String,
})

export const BookingModel = models?.Booking || model<IBooking>('Booking', BookingSchema);
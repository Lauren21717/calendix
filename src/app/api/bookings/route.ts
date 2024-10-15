import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import { NextRequest } from "next/server";

type JsonData = {
    guestName:string;
    guestEmail:string;
    guestNotes:string;
    username:string;
    bookingUri:string;
    bookingTime:string;
};

export async function POST(req: NextRequest) {
    const data:JsonData = await req.json();
    const {guestName, guestEmail, guestNotes, bookingTime} = data;    
    await connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({
        username: data.username,
    });
    if (!profileDoc) {
        return Response.json('invalid url', {status:404})
    }
    const etDoc = EventTypeModel.findOne({
        email: profileDoc.email,
        uri: data.bookingUri,
    })
    if (!etDoc) {
        return Response.json('invalid url', {status:404})
    }

    await BookingModel.create({
        guestName,
        guestEmail,
        guestNotes,
        when: bookingTime,
        eventTypeId: '',
    });
    return Response.json(true, {status:201});
}
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await mongoose.connect(process.env.MONGODB_URI);
    const data = await req.json();
    const email = await session().get('email');
    if (email) {
        const eventTypeDoc = await EventTypeModel.create({ email, ...data });
        return Response.json(eventTypeDoc);
    }
    return Response.json(false);
}
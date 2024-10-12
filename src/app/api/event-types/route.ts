import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const data = await req.json();
    const email = await session().get('email');
    if (email) {
        const eventTypeDoc = await EventTypeModel.create({ email, ...data });
        return Response.json(eventTypeDoc);
    }
    return Response.json(false);
}

export async function PUT(req: NextRequest) {
    await mongoose.connect(process.env.MONGODB_URI as string);
    const data = await req.json();
    const email = await session().get('email');
    const id = data.id;
    if (email) {
        const eventTypeDoc = await EventTypeModel.updateOne(
            {email, _id: id},
            data,
        );
        return Response.json(eventTypeDoc);
    }
    return Response.json(false);
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await mongoose.connect(process.env.MONGODB_URI as string);
    await EventTypeModel.deleteOne({_id: id});
    return Response.json(true);
}
'use server'
import DashboardNav from "@/app/components/DashboardNav";
import { EventType, EventTypeModel } from "@/models/EventType";
import { session } from "@/libs/session";
import mongoose from "mongoose";
import EventTypeForm from "@/app/components/EventTypeForm";
import Link from "next/link";
import { Plus } from "lucide-react";


export default async function EventTypesPage() {

    await mongoose.connect(process.env.MONGODB_URI as string);
    const email = await session().get('email');
    if (typeof email !== 'string') {
        throw new Error('Invalid email: expected a string.');
    }
    const eventTypes = await EventTypeModel.find({ email });

    return (
        <div>
            <DashboardNav />
            <div className="border border-b-0 rounded-xl overflow-hidden my-4">
                {eventTypes.map(et => (
                    <div className="block p-2 border-b">
                        <Link href={'/dashboard/event-types/edit/' + et.id}>
                            {et.title}
                        </Link>
                        <span className="text-gray-400 ml-4 text-sm">
                            http://localhost:3000/username/{et.uri}
                        </span>
                    </div>
                ))}
            </div>

            <Link className="btn-gray"
                href="/dashboard/event-types/new">
                <Plus size={16} />
                New event type
            </Link>
        </div>
    );

}

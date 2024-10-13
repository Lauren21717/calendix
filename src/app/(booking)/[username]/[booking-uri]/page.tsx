import TimePicker from "@/app/components/TimePicker";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { Clock, Info } from "lucide-react";
import { connect } from "mongoose";


type PageProps = {
    params: {
        username: string;
        "booking-uri": string;
    }
};

export default async function BookingPage(props: PageProps) {
    await connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({
        username: props.params.username,
    });
    if (!profileDoc) {
        return '404';
    }
    const etDoc = await EventTypeModel.findOne({
        email: profileDoc.email,
        uri: props.params?.["booking-uri"],
    });
    if (!etDoc) {
        return '404';
    }
    return (
        <div className="flex items-center h-screen bg-cover" style={{ backgroundImage: "url('/images/background.png')" }}>
            <div className="w-full">
                <div className="flex mx-auto max-w-4xl shadow-md rounded-lg overflow-hidden">
                    <div className="bg-blue-100/50 p-8 w-80 text-gray-800">
                        <h1 className="text-2xl font-bold mb-4 pb-2 border-b border-black/20">
                            {etDoc.title}
                        </h1>
                        <div className="grid gap-y-4 grid-cols-[40px_1fr]">
                            <div><Clock /></div>
                            <div>{etDoc.length}<span>min</span></div>
                            <div><Info /></div>
                            <div>{etDoc.description}</div>
                        </div>
                    </div>
                    <div className="bg-white/80 grow p-8">
                        <TimePicker 
                            bookingTimes={JSON.parse(JSON.stringify(etDoc.bookingTimes))} />
                    </div>
                </div>
            </div>
        </div>
    );
}
import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import { ReactNode } from "react";

export default async function DashboardLayout({children}:{children: ReactNode}) {
    const email = await session().get('email');
    if (!email) {
        return 'Please sign up or login'
    }
    await connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({email});
    return (
        <div>
            <DashboardNav username={ profileDoc?.username || '' } />
            {children}
        </div>
    );
}
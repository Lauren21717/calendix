import DashboardNav from "@/app/components/DashboardNav";
import ProfileForm from "@/app/components/ProfileForm";
import { session } from "@/libs/session";
import { connect } from "mongoose";


export default async function DashboardPage() {
    
    return (
        <div>
            <DashboardNav />
            <ProfileForm />
        </div>
    );
}
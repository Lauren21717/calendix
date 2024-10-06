import { session } from "@/app/libs/session";
import { redirect } from "next/navigation";

export async function GET() {
    await session().destroy();
    redirect('/?loggout-out=1');
}
import { session } from "@/libs/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET() {
    await session().set('grantId', null);
    await session().set('email', null);
    revalidatePath('/');
    redirect('/?loggout-out=1');
}
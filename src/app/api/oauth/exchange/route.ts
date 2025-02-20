import { nylas, nylasConfig } from "@/libs/nylas";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";
import { connect } from "mongoose";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";


export async function GET(req: NextApiRequest) {
    console.log("Received callback from Nylas");
    const url = new URL(req.url as string);
    const code = url.searchParams.get('code');

    if (!code) {
        return Response.json("No authorization code returned from Nylas", { status: 400 });
    }

    const response = await nylas.auth.exchangeCodeForToken({
        clientSecret: nylasConfig.apiKey,
        clientId: nylasConfig.clientId as string, 
        redirectUri: nylasConfig.callbackUri, 
        code,
    });
    const { grantId, email } = response;

    await connect(process.env.MONGODB_URI as string);

    const profileDoc = await ProfileModel.findOne({ email });
    if (profileDoc) {
        profileDoc.grantId = grantId;
        await profileDoc.save();
    }
    else {
        await ProfileModel.create({ email, grantId });
    }
    await session().set('email', email);

    
    redirect('/');

}
import { nylas, nylasConfig } from "@/app/libs/nylas";
import { session } from "@/app/libs/session";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";


export async function GET(req: NextApiRequest) {
    console.log("Received callback from Nylas");
    const url = new URL(req.url);
    const code = url.searchParams.get('code');

    if (!code) {
        return Response.json("No authorization code returned from Nylas", { status: 400 });
    }

    const response = await nylas.auth.exchangeCodeForToken({
        clientSecret: nylasConfig.apiKey,
        clientId: nylasConfig.clientId, 
        redirectUri: nylasConfig.callbackUri, 
        code,
    });
    const { grantId, email } = response;

   
    await session().set('grantId', grantId);
    await session().set('email', email);

    
    redirect('/');

}
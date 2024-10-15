import { Document, model, models, Schema } from "mongoose";

interface IProfile extends Document{
    email: string;
    username: string;
    grantId: string;
}

const ProfileSchema = new Schema<IProfile>({
    email: {type: String, required: true, unique: true},
    username: {type: String, unique: true},
    grantId: {type: String},
});

export const ProfileModel = models?.Profile || model<IProfile>('Profile', ProfileSchema);
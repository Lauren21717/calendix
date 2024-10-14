import { Document, model, models, Schema } from "mongoose";

interface IProfile extends Document{
    email: string;
    username: string;
}

const ProfileSchema = new Schema<IProfile>({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
});

export const ProfileModel = models?.Profile || model<IProfile>('Profile', ProfileSchema);
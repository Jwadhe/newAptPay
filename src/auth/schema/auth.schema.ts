import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AuthDocument = Auth & Document

@Schema()
export class Auth {
    @Prop()
    email: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    password: string;

    @Prop()
    isActive: string;
};
export const AuthSchema = SchemaFactory.createForClass(Auth)
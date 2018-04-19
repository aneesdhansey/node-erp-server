import { Document, Model } from 'mongoose'

export interface IUserDocument extends Document {
    email: string
    password: string
    tokens?: Array<{ access: string, token: string }>
}

// instance methods
export interface IUser extends IUserDocument {
    generateAuthToken() : string
    removeToken(token: string) : void
}

// static methods
export interface IUserModel extends Model<IUser> {
    findByToken(token : string) : IUser
    findByCredentials(email: string, password: string) : IUser
}


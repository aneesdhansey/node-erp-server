import mongoose, { Schema, Document, Model, model } from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

import { IUser, IUserModel } from './../interfaces';

const JWT_SECRET : string = process.env.JWT_SECRET || '';


const UserSchema : Schema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this;
    const userObj = user.toObject();

    return _.pick(userObj, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    const access = 'auth';
    
    const token: String = jwt.sign({ _id: user._id.toHexString(), access }, JWT_SECRET).toString();

    user.tokens = [...user.tokens, { access, token }];

    return user.save().then(() => token);
};

UserSchema.methods.removeToken = function (token: string) {
    const user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    });
}

UserSchema.statics.findByToken = function (token: string) {
    const User: any = this;
    let decoded : any ;

    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return Promise.reject(error);
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

UserSchema.statics.findByCredentials = function(email : string, password : string) {
    var User : any = this;

    return User.findOne({ email })
        .then((user : any) => {
            if(!user)
                return Promise.reject(null);
            
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (err : Error, result : Boolean) => {
                    if(err)
                        reject(err);
                    
                    if(result)
                        resolve(user);
                    reject();
                });
            });
        })
        .catch((error : Error) => {
            return Promise.reject(error);
        })
}

UserSchema.pre('save', function(next){
  const user:any = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
  } else {
      next();
  }
});

export const User : IUserModel = model<IUser, IUserModel>('User', UserSchema);

//module.exports = { User };
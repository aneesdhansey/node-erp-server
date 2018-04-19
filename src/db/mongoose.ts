import mongoose from 'mongoose';

const mongoURI: any = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);


module.exports = { mongoose };

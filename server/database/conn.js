import mongoose from "mongoose";
// import {MongoMemoryServer} from 'mongodb-memory-server';

async function connect(){
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect("mongodb+srv://saurabh:RERZBaCyKZb4M1NU@cluster0.fhgbfp5.mongodb.net/?retryWrites=true&w=majority");
    console.log('Database connected');
    return db;
}


export default connect;
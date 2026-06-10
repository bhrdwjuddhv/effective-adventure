import mongoose from 'mongoose'
import {dbName, DB_URI} from "../constants.js";


const connectDb = async () => {

    // "mongodb://localhost:27017/erpportal"
    const uri = `${process.env.MONGODB_URI}/${dbName}`;


    try{
        await mongoose.connect(uri)
        console.log('✅Connected to MongoDB')
    }catch(e){
        console.log("❌ MongoDB Connection Error",e)
        process.exit(1)
    }
}

export default connectDb;
import mongoose from 'mongoose'
import {dbName} from "../constants.js";

const connectDb = async () => {
    try{
        await mongoose.connect(`${process.env.MOGO_DB_URI}/${dbName}`)
        console.log('✅Connected to MongoDB')
    }catch(e){
        console.log("❌ MongoDB Connection Error",e)
        process.exit(1)
    }
}

export default connectDb;
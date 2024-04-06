import { Schema, model, connect } from 'mongoose';


const connectDB = async (MONGODB_URI: string | undefined) => {
    try {
        await connect(MONGODB_URI || "");
        console.log('Database connected successfully');
    } catch (err) {
        console.error(err);
        process.exit(1); 
    }
};

export default connectDB;
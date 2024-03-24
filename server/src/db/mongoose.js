import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("MongoDB coonection successfulll!");
    }).catch(() => {
        console.log("MongoDB coonection failed");
    });
}

export default connectDB;

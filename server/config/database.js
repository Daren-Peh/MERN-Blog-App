import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            console.log("Connected to MongoDB".cyan);   
    } catch(error){
        console.log(error.message.red);
        // exit with failure
        process.exit(1);
    }
}



export default connectToDB;
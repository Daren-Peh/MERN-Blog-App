import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
}, {timestamps: true}
);

userSchema.methods.verifyPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true,

    },
    categories:{
        type: Array,
        required: false
    }},
    {timestamps: true}
);

const Post = mongoose.model("Post", postSchema);

export default Post;
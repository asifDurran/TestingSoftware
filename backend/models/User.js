import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    image: {
        required: false,
        type: String
    },
    cover: {
        required: false,
        type: String
    }
}, {timestamps: true})
const User = mongoose.model('user', userSchema);
export default User

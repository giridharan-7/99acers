import  mongoose  from "mongoose";

//just creating a schema(rules) for the user
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Timestamp Tell mongodb to record the two info one is time of creation of user and the time of the pdate of the user

const User = mongoose.model('user', userSchema);

export default User;
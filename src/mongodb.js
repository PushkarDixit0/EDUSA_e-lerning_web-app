const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGO_URL

if (!mongoUrl) {
    console.warn("MONGO_URL is missing. Add it in your local .env file and in your deployment environment variables.")
}
else {
    mongoose.connect(mongoUrl)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.error("MongoDB connection error:", err.message);
        })
}


const LoginSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'Male', 'Female', 'Other']
    },
    profession: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    profileimg: {
        type: Number,
        required: true

    }

}, { timestamps: true })

const collection = new mongoose.model("Userinfos", LoginSchema)

module.exports = collection


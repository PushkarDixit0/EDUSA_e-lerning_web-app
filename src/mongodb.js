const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    })


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
        enum: ['Male', 'Female', 'Other']
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




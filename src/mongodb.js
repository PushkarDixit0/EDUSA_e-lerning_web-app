const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGO_URL
let connectionPromise

const connectDB = async () => {
    if (!mongoUrl) {
        throw new Error("MONGO_URL is missing. Add it in your local .env file and in your deployment environment variables.")
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(mongoUrl, {
            serverSelectionTimeoutMS: 15000
        })
            .then(() => {
                console.log("MongoDB connected")
                return mongoose.connection
            })
            .catch((err) => {
                connectionPromise = undefined
                console.error("MongoDB connection error:", err.message)
                throw err
            })
    }

    return connectionPromise
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

module.exports = {
    collection,
    connectDB
}


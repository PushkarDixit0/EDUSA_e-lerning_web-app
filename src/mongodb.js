const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/LoginSignupPage")
    .then(() => {
        console.log("MongoDB connect");
    })
    .catch(() => {
        console.log("Fail to connect");
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
        type: String,
        timestamps: true
    },
    gender: {
        type: String,
        possibleValues: ['Male', 'Female', 'Other']
    },
    profession: {
        type: String,
        timestamps: true
    },
    password: {
        type: String,
        required: true
    },
    passwordCheck: {
        type: String,
        required: true
    },
    profileimg: {
        type: Number,
        required: true

    }

})

const collection = new mongoose.model("Userinfos", LoginSchema)

module.exports = collection





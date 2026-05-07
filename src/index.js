
const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config()

const { collection, connectDB } = require("./mongodb")

const templatePath = path.join(__dirname, '../templetes')
const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath));


app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))




app.get("/login", (req, res) => {
    res.render("login")
})
app.get("/signup", (req, res) => {
    res.render("signup")
})



app.post("/signup", async (req, res) => {
    try {
        await connectDB()

        if (req.body.password !== req.body.passwordCheck) {
            return res.send("Check Password")
        }

        const data = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            dob: req.body.dob,
            gender: req.body.gender,
            profession: req.body.profession,

            password: req.body.password,
            profileimg: req.body.profileimg || 1
        }

        const exestingUser = await collection.findOne({ email: req.body.email })
        if (exestingUser) {
            return res.send("user alredy exites")
        }

        await collection.create(data)
        res.redirect("/profile?email=" + req.body.email + "&gender=" + req.body.gender + "&fname=" + req.body.fname + "&lname=" + req.body.lname + "&profession=" + req.body.profession + "&profileimg=" + req.body.profileimg);
    }
    catch (err) {
        console.error("Signup error:", err.message)
        res.status(400).send("Signup error: " + err.message)
    }

})



app.post("/login", async (req, res) => {
    try {
        await connectDB()

        const user = await collection.findOne({ email: req.body.email })

        if (user && user.password === req.body.password) {

           res.redirect("/profile?email=" + req.body.email + "&gender=" + user.gender + "&fname=" + user.fname+ "&lname=" + user.lname + "&profession=" + user.profession + "&profileimg=" + user.profileimg);

        }
        else {
            res.send("Password Wrong")
        }
    }
    catch {
        res.send(" Wrong Details")
    }
})



app.get("/profile", async (req, res) => {
    try {

        res.render("profile")

    }
    catch {
        res.send("no")
    }
});










const PORT = process.env.PORT || 5000

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`port connect ${PORT}`);
    })
}

module.exports = app

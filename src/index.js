
const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")

const collection = require("./mongodb")

const { template } = require("handlebars")
const { userInfo } = require("os")
const { Session } = require("inspector")
const templatePath = path.join(__dirname, '../templetes')

app.use(express.static('public'));


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

    const data = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        profession:req.body.profession,

        password: req.body.password,
        passwordCheck: req.body.passwordCheck,
        profileimg:req.body.profileimg
    }
    const exestingUser = await collection.findOne({ email: req.body.email })
    if (exestingUser) {
        res.send("user alredy exites")
    }
    try {

        if (req.body.password === req.body.passwordCheck) {
            await collection.insertMany([data])
            res.redirect("/profile?email=" + req.body.email + "&gender=" + req.body.gender + "&fname=" + req.body.fname+ "&lname=" + req.body.lname + "&profession=" + req.body.profession + "&profileimg=" + req.body.profileimg);
        
        }

        else {
            res.send("Check Password")
        }
    }
    catch {
        res.send("Enter Detail error")
    }

})



app.post("/login", async (req, res) => {
    try {
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










app.listen(3000, () => {
    console.log("port connect");
})




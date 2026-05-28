const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')


const authRouter = require("./routes/auth.router")
const postRouter = require("./routes/post.router")


app.use(cookieParser())
app.use(express.json())

app.use("/api/auth/", authRouter)
app.use("/api/post/",postRouter)

module.exports = app;
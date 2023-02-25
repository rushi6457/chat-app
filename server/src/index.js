const express = require("express");
const cors = require('cors')
const connect = require("./config/db")
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(cors({origin:true,credentials:true}))

app.get("/",(req,res) =>res.send("HELLO"))

app.listen(process.env.PORT , async() =>{
    await connect()
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})
const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv').config()
const port=process.env.PORT || 8000
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDb=require('./config/db')

// connect to db
connectDb()

const app=express()
// allow to send json 
app.use(express.json())
// allow form urlencoded
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.status(201).send('hello')
})
// routes
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))
// use this after routes to work
app.use(errorHandler)

app.listen(port,()=>console.log('server started on port'+port))

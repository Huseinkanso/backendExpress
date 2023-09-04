const mongoose=require('mongoose')

const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connected: ' + conn.connection.host.cyan.underline);
    } catch (error) {
        console.log(`error ${error.message}`.red.underline.bold);
        process.exit(1)
    }
}

module.exports=connectDb
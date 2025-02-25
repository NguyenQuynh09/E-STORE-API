const mongoose = require("mongoose")

const mondbUrl="mongodb+srv://dunguyenquynh127:1234567890@cluster0.ldvzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDb=()=>{
    return mongoose.connect(mondbUrl);
}

module.exports={connectDb}
const app = require(".");
const { connectDb } = require("./config/db");

const PORT=5454;
app.listen(PORT, async()=>{
    await connectDb();
    console.log("E-STORE api listing on PORT : ",PORT);
})
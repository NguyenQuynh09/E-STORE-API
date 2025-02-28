const jwtProvider = require("../config/jwt.Provider.js")
const userService = require("../services/user.service.js")


const authenticate = async(req,res,next)=>{
    //Bearer token....
    try {
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(404).send({error:"Không tìm thấy mã thông báo..."})
        }
        const userId = jwtProvider.getUserProfileFromToken(token);
        const user = await userService.getUserById(userId);
        req.user=user;
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
    next();
}
module.exports=authenticate
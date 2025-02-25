const jwt=require("jsonwebtoken")


const SECRECT_KEY="taolanguoideptrainhatvutrudotuibaybietkhong"

const generateToken=(userId)=>{
const token=jwt.sign({userId},SECRECT_KEY,{expiresIn:"48h"})
return token;
}



const getUserProfileFromToken=(token)=>{
    const  decodedToken=jwt.verify(token,SECRECT_KEY)
    return decodedToken.userId;
}

module.exports={generateToken,getUserProfileFromToken}
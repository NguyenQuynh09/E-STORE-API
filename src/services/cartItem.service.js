const CartItem = require("../models/cartItem.model");
const userService = require("../services/user.service.js");


async function updateCartItem(userId,cartItemId,cartItemData){
    try{
        const item = await findCartItemById(cartItemId);
        if(!item){
            throw new Error("Không tìm thấy mục giỏ hàng : ",cartItemId)
        }
        const user = await userService.getUserById(item.userId);
        if(!user){
            throw new Error("Không tìm thấy người dùng : ",userId)
        }
        if(user._id.toString()===userId.toString()){
            item.quantity = cartItemData.quantity;
            item.price = item.quantity*item.product.price;
            item.discountedPrice = item.quantity*item.product.discountedPrice;
            const updateCartItem = await item.save();
            return updateCartItem;
        }
        else{
            throw new Error("Không thể cập nhật mặt hàng trong giỏ hàng này")
        }
    }catch(error){
        throw new Error(error.message)
    }
}
async function removeCartItem(userId,cartItemId){
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserByEmail(userId);

    if(user._id.toString()===cartItem.userId.toString()){
        await CartItem.findByIdAndDelete(cartItemId)

    }
    throw new Error("bạn không thể xóa mục của người dùng khác");
}
async function findCartItemById(cartItemId){
    const cartItem = await findCartItemById(cartItemId);
    if(cartItem){
        return cartItem

    }
    else{
        throw new Error("cartitem not found with id ",cartItemId)
    }
}
module.exports={
    updateCartItem,
    removeCartItem,
    findCartItemById,
};
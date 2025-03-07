const cartService=require("../services/cart.service.js")

const findUserCart = async(req,res)=>{
    const user = req.user;
    try {
        const cart = await cartService.findUserCart(user.id);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const addItemToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("User ID:", userId);
        console.log("Request body:", req.body);

        const response = await cartService.addCartItem(userId, req.body);
        return res.status(200).send(response);
    } catch (error) {
        console.error("Error adding item to cart:", error.message);
        return res.status(500).send({ error: error.message });
    }
};
module.exports={
    addItemToCart,
    findUserCart
}
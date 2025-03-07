const cartService = require("../services/cart.service.js")
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js")
const orderItem =  require("../models/orderItem.js");
async function createOrder(user, shipAddress) {
    try {
        let address;
        if (shipAddress._id) {
            address = await Address.findById(shipAddress._id);
            if (!address) throw new Error("Invalid shipping address ID provided.");
        } else {
            address = new Address(shipAddress);
            address.user = user;
            await address.save();

            user.address.push(address);
            await user.save();
        }

        const cart = await cartService.findUserCart(user._id);
        if (!cart || cart.cartItems.length === 0) {
            throw new Error("Cart is empty. Cannot create an order.");
        }

        const orderItems = [];
        const createdOrder = new Order({
            user: user._id,
            orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountedPrice,
            totalItem: cart.totalItem,
            discounted: cart.discounted,
            shippingAddress: address,
        });

        const savedOrder = await createdOrder.save();
        return savedOrder;

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = " PLACED";
    order.paymentDetails.status = "COMPLETED";

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
}
async function shipOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
}
async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
}
async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELLED";

    return await order.save();
}
async function findOrderById(orderId) {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")
    return order
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()
        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}
async function getAllOrders() {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()

}
async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = {
    createOrder, 
    placeOrder, 
    confirmedOrder, 
    shipOrder, 
    deliverOrder, 
    cancelOrder, 
    findOrderById, 
    usersOrderHistory, 
    getAllOrders, 
    deleteOrder,
    orderItem
}
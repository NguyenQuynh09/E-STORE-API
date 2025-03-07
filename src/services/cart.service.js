const Product = require('../models/product.model');
const Cart = require('../models/cart.model');
const CartItem = require('../models/cartItem.model');
async function createCart(userId) {
  try {
    const cart = new Cart({ user: userId }); // Đúng định nghĩa
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await cartService.createCart(userId);
    }

    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let item of cart.cartItems) {
      totalPrice += item.price;
      totalDiscountedPrice += item.discountedPrice;
      totalItem += item.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discounted = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, req) {
  try {
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
          cart = await createCart(userId);
      }

      const product = await Product.findById(req.productId);
      if (!product) {
          throw new Error("Product not found");
      }

      const isPresent = await CartItem.findOne({
          cart: cart._id,
          product: product._id,
      });

      if (!isPresent) {
          const cartItem = new CartItem({
              product: product._id,
              cart: cart._id,
              quantity: 1,
              userId,
              price: product.price,
              discountedPrice: product.discountedPrice,
          });

          const createdCartItem = await cartItem.save();
          cart.cartItems.push(createdCartItem);
          await cart.save();
          return "Item added to cart";
      } else {
          throw new Error("Item already exists in cart");
      }
  } catch (error) {
      throw new Error(error.message);
  }
}

module.exports = { createCart, addCartItem, findUserCart };

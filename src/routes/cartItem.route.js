const express=require("express")
const router=express.Router();

const carItemController = require("../controller/cartitem.controller.js");
const authenticate = require("../middleware/authenticate.js");

router.put("/:id" , authenticate,carItemController.updateCartItem);
router.delete("/:id",authenticate,carItemController.removeCartItem);

module.exports=router;
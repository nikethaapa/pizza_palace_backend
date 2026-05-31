const express = require("express");
const router = express.Router();
const Order=require("../models/Order")

const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware =require("../middleware/adminMiddleware")

router.post("/place",authMiddleware,async(req,res)=>{
    try{
        const {items,totalAmount,address}=req.body
        const neworder=new Order({
            user: req.user.id,
            items,
            totalAmount,
            address
        })
        await neworder.save()
        res.status(201).json({
                message: "Order Placed Successfully"
            })
    }catch(err){
        console.log(err)
        res.status(500).json({
                error: err.message
            })
    }
})
router.get("/myorders",authMiddleware,async (req, res) => {

        try{

            const orders = await Order.find({

                user: req.user.id

            }).sort({ createdAt: -1 });

            res.status(200).json(orders);

        }catch(err){

            console.log(err);

            res.status(500).json({
                error: err.message
            });

        }

    }
);
router.get("/all",authMiddleware,adminMiddleware,async (req, res) => {

        try{

            const orders =
            await Order.find()
            .sort({ createdAt: -1 });

            res.status(200).json(orders);

        }catch(err){

            console.log(err);

            res.status(500).json({
                error: err.message
            });

        }

    }
);
router.put("/status/:id",authMiddleware,adminMiddleware,async (req, res) => {

        try{

            const { status } = req.body;

            await Order.findByIdAndUpdate(

                req.params.id,

                { status }

            );

            res.status(200).json({

                message:
                "Order Status Updated"

            });

        }catch(err){

            console.log(err);

            res.status(500).json({
                error: err.message
            });

        }

    }
);
router.delete("/cancel/:id", authMiddleware, async(req,res)=>{

    try{

        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({
                message:"Order not found"
            });
        }

        if(order.status !== "Pending"){
            return res.status(400).json({
                message:"Only pending orders can be cancelled"
            });
        }

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Order Cancelled Successfully"
        });

    }catch(err){

        res.status(500).json({
            error: err.message
        });

    }

});
module.exports = router;
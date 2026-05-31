const express = require("express");

const Pizza = require("../models/Pizza");
const router = express.Router()

router.post("/add",async function(req,res){
    try{
        const pizza=new Pizza(req.body)
        await pizza.save()
        res.status(201).json({
            message:"pizza added Successfully"
        })
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
})

router.get("/all", async function(req,res){

    try{

        const pizzas = await Pizza.find({
            isAvailable: true
        });

        res.status(200).json(pizzas);

    }catch(err){

        res.status(500).json({
            error: err.message
        });

    }

});
router.put("/:id", async(req,res)=>{

    try{

        const updatedPizza =
        await Pizza.findByIdAndUpdate(

            req.params.id,

            req.body,

            { new:true }

        );

        res.status(200).json(updatedPizza);

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

});
router.delete("/:id", async(req,res)=>{

    try{

        await Pizza.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:"Pizza Deleted"
        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

});
router.put("/toggle/:id", async(req,res)=>{

    try{

        const pizza = await Pizza.findById(req.params.id);

        if(!pizza){
            return res.status(404).json({
                message: "Pizza not found"
            });
        }

        pizza.isAvailable = !pizza.isAvailable;

        await pizza.save();

        res.status(200).json({
            message:"Availability Updated",
            isAvailable:pizza.isAvailable
        });

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

});
module.exports=router
const express = require('express');
const router = express.Router()
const MenuItem = require('./../models/MenuItem')

router.post('/',async(req,res)=>{
    try{
        const data =   req.body 
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log("new menu added")
        res.status(200).json(response)
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:"Internal server error"})
    }
})

router.get('/',async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"Internal Server error"});

    }
})

router.get('/:tastetype',async(req,res)=>{
    try{
     
        const tastetype = req.params.tastetype;
        if(tastetype=='sweet'||tastetype=='spicy'||tastetype=='sour')
        {
            const data = await MenuItem.find({taste:tastetype})
            console.log("data fetched");
            res.status(200).json(data)
        }
        else
        {
            console.log("wrong input taste");
            res.status(404).json({error:"error not found"})
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({err:"internal server error"})
    }
    
})


module.exports = router
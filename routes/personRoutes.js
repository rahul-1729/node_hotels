const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')

router.post('/',async(req,res)=>{
    try{
     const data = req.body
     const newPerson = new Person(data);
    
     const  response = await newPerson.save();
     console.log('data saved')
     res.status(200).json(response);
 
    }catch(err)
    {
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
 
    }
     
 })

 router.get('/',async(req,res)=>{
    try{
           const data = await Person.find();
           console.log('data fetched');
           res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType',async (req,res)=>{
    try{
        const workType  = req.params.workType;
        if(workType=='chef'||workType=='manager'||workType=='waiter')
        {
            const response =await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else
        {
            res.status(404).json({error:"invalid work type"})
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error: "Internal server Error"});
        
    }
   
})

router.put('/:id',async (req,res)=>{
    try
    {
        const personId = req.params.id;
        const data = req.body;
        const response = await Person.findByIdAndUpdate(personId,data,{
            new: true,
            runValidators:true

        });
        if(!response)
        {
            return res.status(404).json("Id not found");
        }

        console.log("data updated");
        res.status(200).json(response);
    }
    catch(err)
    {
       console.log(err);
       res.status(500).json({err:"internal server error"})
    }
   
})

router.delete('/:id',async(req,res)=>{
    try{
         const personId = req.params.id;
         const response = await Person.findByIdAndDelete(personId);

         if(!response)
         {
            return res.status(404).json({error:'Person not found'});
         }
         console.log('data deleted');
         res.status(200).json({message:"person deleted Successfully"});

    }
    catch(err)
    {
       console.log(err);
       res.status(500).json({error:"Internal server error"});
    }
})

module.exports=router
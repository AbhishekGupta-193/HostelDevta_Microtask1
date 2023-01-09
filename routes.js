const router=require('express').Router();
const db=require('./data.js')

//POST Address
router.post('/address',(req,res)=>{
    const{dist,city,pin}=req.body;
    const add ={dist,city,pin}
    db.push(add)
    res.json({add})
})

//To GET all the addresss info
router.get('/info',(req,res)=>{
    const allAdd=db;
    res.json({allAdd})
})

//to PUT (update) any particular address data
router.put('/update/:data',(req,res)=>{
    const data=req.params.data;
    const{dist,city,pin}=req.body;
    const scheme={dist:dist,city:city,pin:pin}
    try{
        const datai=db.find(e=>e.pin==data);
        if(!datai){
            return res.json("Sorry , Address for this pin is not available here")
        }
        const index=db.findIndex((e)=>{
            return e.pin==data;
        })
        for(const key in db[index]){
            db[index][key]=scheme[key]?scheme[key]:db[index][key];
        }
        return res.json({"status":"Updated", data:db[index]});


    }catch(error){
        console.log(error);
        res.send("SERVER ERROR");
    }

})

//to DELETE any particular address data
router.delete('/deleteinfo/:data',(req,res)=>{
    const data=req.params.data;
    const datai=db.find(e=>e.pin==data);
    if(!datai){
        return res.json("Data to be deleted dosent exists");
    }
    const index=db.findIndex((e)=>{
        return e.pin==data;
    })
    if(index!==-1){
        db.splice(index,1)[0];
    }
    return res.json({"status":"user removed",datai});
})


module.exports=router;
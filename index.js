const express=require('express')
const app=express()
const router=require('./routes.js')

// MIDDLEWARE
app.use(express.json())
app.use(router)

// app.listen(3000,(req,res)=>{
//     console.log('Server is listening to 3000...')
// })
module.exports=app;
const express = require("express");
const { Configuration,OpenAIApi } = require("openai");
const cors=require("cors")
require("dotenv").config();

const openai=new OpenAIApi(new Configuration({
    apiKey:process.env.API_KEY
  }))
  
  const app=express()
  
  app.use(cors())
  
  app.use(express.json())
  

  app.post("/ab",(req,res)=>{
        res.send({msg:"LDFN"})
  })
  app.post("/getJoke",(req,res)=>{

    const {prompt} = req.body;

   

     if (!prompt) {
        return res.status(400).send({error: 'Prompt is missing in the request'});
    }
       try {
           openai.createChatCompletion({
               model:"gpt-3.5-turbo",
               messages:[{role:"user",content:prompt}]
           }).then((data)=>{
               res.status(200).send(data.data.choices[0])
           })
       } catch (error) {
        return res.status(500).send(error.messages)
       }

 })


 app.listen(process.env.PORT,()=>{
    console.log(`Server is runing at port ${process.env.PORT}`)
 })
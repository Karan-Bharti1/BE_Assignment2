const {initializerDatabase}=require("./database/db.connect")
initializerDatabase()
const express=require('express')
const app=express()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const RecipeModel=require('./Recipe.models')
const PORT=3000
async function createRecipeData(newRecipe){
    try {
      const recipe=new RecipeModel(newRecipe)  
      const saveData=await recipe.save()
      return saveData
    } catch (error) {
        throw error
    }
}
app.post("/recipes",async(req,res)=>{
    try {
     const savedData=await createRecipeData(req.body)   
     if(savedData){
        res.status(201).json({message:"Data Added to database Successfully",savedData})
     }
    } catch (error) {
     res.status(500).json({error:"Failed to add data to the database"})   
    }
    })
    app.listen(PORT,()=>{
        console.log("Connected to port ",PORT)
    })
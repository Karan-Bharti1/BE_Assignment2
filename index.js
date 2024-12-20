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
    async function readAllRecipes(){
        try {
            const recipes=await RecipeModel.find()
            return recipes
        } catch (error) {
            throw error
        }
    }
    app.get("/",async(req,res)=>{
        try {
          const recipes=await readAllRecipes() 
          if(recipes.length!=0){
            res.status(201).json(recipes)
          } else{
            res.status(404).json({error:"Recipes Not Found"})
          }
        } catch (error) {
           res.status(500).json({error:"Failed to get recipes"}) 
        }
    })
    async function readRecipesByTitle(titleName) {
        try {
            const recipe=await RecipeModel.findOne({title:titleName})
            return recipe
        } catch (error) {
          throw error  
        }
    }
    app.get("/recipes/:titleName",async(req,res)=>{
        try {
           const recipe =await readRecipesByTitle(req.params.titleName) 
           if(recipe){
            res.status(201).json(recipe)
        } else{
          res.status(404).json({error:"Recipe Not Found"})
        }
        } catch (error) {
            req.status(500).json({error:"Failed to get recipe from the database"})
        }
    })
    app.listen(PORT,()=>{
        console.log("Connected to port ",PORT)
    })
// load environment variables
import express from "express";
import { getAllRecipes } from "./db/recipes.js"

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Recipe book server listening on port ${port}`)
})

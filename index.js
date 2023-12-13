import express from 'express'
import userRouter from './src/Modules/User/user.routes.js'
import noteRouter from './src/Modules/Note/note.routes.js'
import { db_connection } from './DB/connection.js'


const app = express()
app.use(express.json())
app.use(userRouter)
app.use(noteRouter)

db_connection()

app.listen(3000, ()=>{
    console.log("running on port 3000");
})
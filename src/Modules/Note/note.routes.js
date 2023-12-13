import {Router} from 'express'
import * as nc from './note.controller.js'

const router = Router();

router.get('/getAllNotes', nc.getAllNotes)

router.post('/addNote', nc.addNote)

router.delete('/deleteNote', nc.deleteNote)

router.put('/updateNote', nc.updateNote)

router.get('/getWithInfo', nc.getWithInfo)


export default router
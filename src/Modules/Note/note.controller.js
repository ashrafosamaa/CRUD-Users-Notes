import Note from '../../../DB/Models/note.model.js'
import User from '../../../DB/Models/user.model.js'
import { Op } from 'sequelize'


export const getAllNotes = async (req, res, next)=>{
    const notes = await Note.findAll()
    if(!notes.length){
        return res.json({msg: "No data found"})
    }
    return res.json({msg: "All Notes", notes})
}

export const addNote = async (req, res, next)=>{
    const {title, content, userID} = req.body
    const userCheck = await User.findByPk(req.body.userID)
    if(!userCheck){
        return res.json({msg: "there is no user with this id"})
    }
    const titleChecker = await Note.findOne({
        where:{
            title
        }
    })
    if(titleChecker){
        return res.json({msg: "this title added before"})
    }
    const newNote = await Note.create({title, content, userID})
    if(newNote._options.isNewRecord){
        return res.json({msg: "Note added Successfully"})
    }
    return res.json({msg: "title doesn't added"})
}

export const deleteNote = async (req, res, next)=>{
    const {title} = req.body
    const {userID} = req.query
    const idChecker = await Note.findOne({
        where:{
            userID
        }
    })
    if(!idChecker){
        return res.json({msg: "user id is not correct"})
    }
    const titleChecker = await Note.findOne({
        where:{
            title
        }
    })
    if(!titleChecker){
        return res.json({msg: "no note with this name"})
    }
    await titleChecker.destroy()
    res.json({msg: "note deleted successfully"})
}

export const updateNote = async (req, res, next)=>{
    const {userID} = req.query
    const {title, content} = req.body
    const idChecker = await Note.findOne({
        where:{
            userID,
            id : req.body.id
        }
    })
    if(!idChecker){
        return res.json({msg: "user id or id is not correct"})
    }
    const titleChecker = await Note.findOne({
        where:{
            title,
            id:{
                [Op.notLike] : req.body.id
            }
        }
    })
    if(titleChecker){
        return res.json({msg: "title used before"})
    }
    await idChecker.update({
        title,
        content
    })
    return res.json({msg: "Note updated successfully"})
}

export const getWithInfo = async (req, res, next)=>{
    const notes = await Note.findAll({
        include:[
            {
                model: User,
                attributes: ['name', 'email']
            }
        ]
    })
    if(!notes.length){
        return res.json({msg: "No data found"})
    }
    return res.json({msg: "All Notes", notes})

}
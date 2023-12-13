import User from "../../../DB/Models/user.model.js"
import {Op} from 'sequelize'

export const getAllUser = async (req, res, next)=>{
    const users = await User.findAll()
    if(!users.length){
        return res.json({msg: "no data found"})
    }
    return res.json({msg: "All Users", users})
}

export const signUp = async (req, res, next)=>{
    const {name, email, password, age} = req.body
    const emailChecker = await User.findOne({
        where:{
            email
        }
    })
    if(emailChecker){
        return res.json({msg: "this email used before"})
    }
    const newUser = await User.create({name, email, password, age})
    if(newUser._options.isNewRecord){
        return res.json({msg: "user added successfully"})
    }
    return res.json({msg: "user doesnot added"})
}

export const signIn = async (req, res, next)=>{
    const {email, password} = req.body
    const userCheck = await User.findOne({
        where:{
            email: email,
            password: password
        }
    })
    if(userCheck){
        return res.json({msg: "signin successfully"})
    }
    res.json({msg: "email or password is incorrect"})
}

export const deleteUser = async (req, res, next)=>{
    const {email, password} = req.body
    const user = await User.findOne({
        where:{
            email,
            password
        }
    })
    if(!user){
        return res.json({msg: "email or password is incorrect"})
    }
    await user.destroy()
    res.json({msg: "User Deleted Successfully"})
}

export const updateUser = async (req, res, next)=>{
    const {name, email, password, age} = req.body
    const user = await User.findByPk(req.query.id)
    if(!user){
        return res.json({msg: "user not found"})
    }
    const emailChecker = await User.findOne({
        where:{
            email,
            id :{
                [Op.notLike] : req.query.id
            }
        }
    })
    if(emailChecker){
        return res.json({msg: "this email used before"})
    }
    await user.update({
        name,
        email,
        password,
        age,
    })
    return res.json({msg: "user updated successfully"})
}

export const listUserA = async (req, res, next)=>{
    const users = await User.findAll({
        where:{
            name:{
                [Op.like] : 'a%'
            }
        }
    })
    if(!users.length){
        return res.json({msg: "No data found"})
    }
    return res.json({msg: "All Users Start with 'A'", users})
}

export const listUsersTwenty = async (req, res, next)=>{
    const users = await User.findAll({
        where:{
            age:{ [Op.between]: [20, 30] }
        }
    })
    if(!users.length){
        return res.json({msg: "No data found"})
    }
    return res.json({msg: "All Users their age between 20 and 30", users})
}

export const listOldestThreeUsers = async (req, res, next)=>{
    const users =  await User.findAll({
        order: [['age', 'DESC']],
        limit: 3
    })
    if(!users.length){
        return res.json({msg: "No data found"})
    }
    return res.json({msg: "The Oldest 3 Users", users})
}

export const listById = async (req, res, next)=>{
    const {usersId} = req.query
    if(!usersId){
        return res.json({msg: "Please enter ids"})
    }
    const users = await User.findAll({
        where:{
            id:{
                [Op.in] : usersId
            }
        }
    })
    if(!users.length){
        return res.json({msg: "No data found"})
    }
    return res.json({msg: "done", users})
}
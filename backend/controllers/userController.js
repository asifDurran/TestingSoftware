import {body, validationResult} from "express-validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import UserModel from"../models/User.js"
export const registerErrors = [
    body('name').not().isEmpty().trim().withMessage('Name is requried'),
    body('email').not().isEmpty().isEmail().trim().withMessage('Email is requried'),
    body('password').isLength({min: 6}).trim().withMessage('Password should be 6 charactors long'),
]
const userToken = (user) => {
    return jwt.sign({user}, process.env.SECRET, {expiresIn: "1d"})
}
export const userRegister = async (req, res) => {
    const {name, email, password} = req.body;
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors: result.array()})
    } else {
      try {
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(password, salt)
          const user = await UserModel.findOne({email});
          if(!user){
        try {
            const response = await UserModel.create({
                name,
                email,
                password: hashed
            })
            const token = userToken(response);
            return res.status(200).json({msg: 'Your account has been created', token})
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({errors: error})
        }
          } else {
              return res.status(400).json({errors: [{msg: `${email} is already taken`}]})
          }
      } catch (error) {
        console.log(error.message)
          return res.status(500).json({errors: error})
      }
    }
}
export const loginErrors = [
    body('email').not().isEmpty().isEmail().trim().withMessage('Email is requried'),
    body('password').not().isEmpty().trim().withMessage('Password is required'),
];
export const userLogin = async (req, res) => {
   const {email, password} = req.body;
   const result = validationResult(req);
   if(!result.isEmpty()){
       return res.status(400).json({errors: result.array()})
   } else {
       try {
           const user = await UserModel.findOne({email});
           if(user){
               const matched = await bcrypt.compare(password, user.password)
               if(matched){
                       const token = userToken(user);
                       return res.status(200).json({msg: 'You are logged in successfully', token})
               } else {
                   return res.status(400).json({errors: [{msg: 'Your password is not correct'}]})
               }
           } else {
            return res.status(400).json({errors: [{msg: `${email} is not a valid email`}]})
           }
       } catch (error) {
        return res.status(500).json({errors: error})
       }
   }
}
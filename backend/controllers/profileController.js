import upload from "formidable"
import { v4 as uuidv4 } from 'uuid';
import fs from "fs"
import path from 'path';
import jwt from "jsonwebtoken"
import { fileURLToPath } from 'url';
import User from "../models/User.js"
export const updateImage = (req, res) => {
  const form = upload({multiples: true})
  form.parse(req, (err, fields, files) => {
      const errors = []
      if(Object.keys(files).length === 0){
        errors.push({msg:'Profile picture is required'})
      } else {
          const {type} = files.image;
          const split = type.split('/');
			const extension = split[1].toLowerCase();
			if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
				errors.push({ msg: `${extension} is not a valid extension` });
			} else {
				files.image.name = uuidv4() + '.' + extension;
			}
      }
      if (errors.length !== 0) {
        return res.status(400).json({ errors });
    } else {
        const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
        const newPath = __dirname + `/../client/public/images/${files.image.name}`;
                fs.copyFile(files.image.path, newPath, async (err) => {
                    if(!err){
                          try {
                            const user = await User.findOneAndUpdate({_id: fields.id}, {image: files.image.name},{new:true})
                            const token = jwt.sign({user}, process.env.SECRET, {expiresIn: "1d"})
                            return res.status(200).json({token, msg: 'Your profile picture has been updated'})
                          } catch (error) {
                            return res.status(500).json({errors: error})
                          }
                    }
                })
    }
  })
}

//cover image updation

export const coverUpdateImage = (req, res) => {
  const form = upload({multiples: true})
  form.parse(req, (err, fields, files) => {
      const errors = []
      if(Object.keys(files).length === 0){
        errors.push({msg:'Profile picture is required'})
      } else {
          const {type} = files.image;
          const split = type.split('/');
			const extension = split[1].toLowerCase();
			if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png') {
				errors.push({ msg: `${extension} is not a valid extension` });
			} else {
				files.image.name = uuidv4() + '.' + extension;
			}
      }
      if (errors.length !== 0) {
        return res.status(400).json({ errors });
    } else {
        const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
        const newPath = __dirname + `/../client/public/images/${files.image.name}`;
                fs.copyFile(files.image.path, newPath, async (err) => {
                    if(!err){
                          try {
                            const user = await User.findOneAndUpdate({_id: fields._id}, {cover: files.image.name},{new:true})
                            const token = jwt.sign({user}, process.env.SECRET, {expiresIn: "1d"})
                            return res.status(200).json({token, msg: 'Cover image updated.'})
                          } catch (error) {
                            return res.status(500).json({errors: error})
                          }
                    }
                })
    }
  })
}
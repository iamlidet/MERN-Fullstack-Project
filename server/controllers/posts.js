import express from 'express';

import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';


const router = express.Router();

export const getPosts = async (req,res)=>{
  try {
    const postMessages = await PostMessage.find();
    //return an array of all messages that we have
    res.status(200).json(postMessages);

  } catch (error) {
    res.status(404).json({message: error.message});
  }
}
/*
export const createPost = async (req,res)=>{
    
    const post = req.body;
    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {

        res.status(409).json({message: error.message});
    
    }
}*/

export const createPost = async (req, res) => {
  const { title, message, selectedFile, creator, tags } = req.body;

  const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

  try {
      await newPostMessage.save();

      res.status(201).json(newPostMessage );
  } catch (error) {
      res.status(409).json({ message: error.message });
  }
}

export const getPost = async (req, res) => { 
  const { id } = req.params;

  try {
      const post = await PostMessage.findById(id);
      
      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}
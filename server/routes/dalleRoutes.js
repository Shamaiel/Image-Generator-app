
import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}); 
const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send("Hello from DALL-Image-GEN!")
  // res.status(200).json({ message: 'Hello from DALL-Image-GEN!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;








// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();
// import OpenAI from "openai";

// const router = express.Router();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const aiResponse = await openai.images.generate({
//       model: "dall-e-3", 
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });
//     const image = aiResponse.data[0].b64_json;
//     res.status(200).json({ photo: image });
//   } catch (e) {
//     console.log(e);
//   }
// });

// export default router;
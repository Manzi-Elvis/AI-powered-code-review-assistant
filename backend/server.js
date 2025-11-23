import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// API endpoint to review code
app.post("/review", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a senior software engineer doing a strict code review.",
        },
        {
          role: "user",
          content: `Please review this code:\n\n${code}`,
        },
      ],
    });
    res.json({
      review: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(5000, () => console.log("Server running on port 5000"));
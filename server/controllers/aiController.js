import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const writeSymptom = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${prompt}, ${content}, 'Symptoms')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const reviewReport = async (req, res) => {
  try {
    const { userId } = req.auth();
    const PDF = req.file;

    if (PDF.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "PDF file size exceeds allowed size (5MB).",
      });
    }

    const dataBuffer = fs.readFileSync(PDF.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `You are a medical assistant AI. Please review the attached patient's medical report thoroughly. 
      Analyze it as a complete document and provide clear, structured, and constructive feedback. 
      Focus on:
      - Clarity of the information presented
      - Organization and readability
      - Completeness of patient details
      - Consistency of medical terminology
      - Whether the report indicates any health issues, their seriousness, and necessary precautions

      ⚠️ Do NOT provide any diagnosis or treatment suggestions. 
      ⚠️ Do NOT provide any suggestions for improving the layout or formatting of the report. Focus only on the medical content and patient information.

      Start your response with: "Here's a detailed and constructive review of the patient's medical report:"

      (Max length: 600 words)

      Report content:
      \n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, 'Review the report', ${content}, 'review-report')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

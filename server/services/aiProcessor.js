// server/services/aiProcessor.js
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const fs = require('fs').promises; // Use promises version of fs
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-2.0-flash"; // Use the desired model
console.log("[ENV DEBUG] GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
if (!API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to convert file buffer to generative part
function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType
    },
  };
}

async function processPdfWithAI(filePath, originalFilename) {
    console.log(`[aiProcessor] Starting processing for: ${originalFilename} at ${filePath}`);
    try {
        const fileBuffer = await fs.readFile(filePath);
        const mimeType = "application/pdf";
        const filePart = fileToGenerativePart(fileBuffer, mimeType);
        console.log(`[aiProcessor] File part prepared.`);

        const prompt = `
You are an AI summarization engine. Analyze the content of the provided PDF file: ${originalFilename}.
Your task is to return a single, valid JSON object containing exactly two keys: "summaries" and "questions".

1. "summaries": an array of JSON objects. Each object should include:
   - "title": a short descriptive string for the section or concept.
   - "summary": a concise description of that section.
   - "estimatedTime": a string like "2 minutes" estimating reading time.

2. "questions": an array of JSON objects. Each object should include:
   - "question": a flashcard-style question.
   - "answer": the correct answer to the question.

Requirements:
- Output ONLY the raw JSON object. No markdown, no backticks, no explanations.
- Do NOT include greetings, comments, or introductory/conclusion phrases.
- Escape all strings properly to ensure valid JSON.
- Provide 3–10 summaries and 5–15 questions depending on document complexity.

Example format:
{
  "summaries": [
    { "title": "Concept A", "summary": "Brief explanation of Concept A", "estimatedTime": "2 minutes" },
    { "title": "Method B", "summary": "Details about how Method B works", "estimatedTime": "5 minutes" }
  ],
  "questions": [
    { "question": "What is Concept A?", "answer": "Concept A is..." },
    { "question": "How does Method B work?", "answer": "Method B involves..." }
  ]
}
        `;

        const model = genAI.getGenerativeModel({ model: MODEL_NAME });

        console.log(`[aiProcessor] Sending request to Gemini model: ${MODEL_NAME}...`);
        const result = await model.generateContent([prompt, filePart]);
        const response = result.response;

        if (!response || !response.text) {
            throw new Error("Invalid or empty response received from Gemini.");
        }

        let rawText = response.text();
        console.log(`[aiProcessor] Raw Gemini text received (first 200 chars):\n${rawText.substring(0, 200)}...`);

        // Remove Markdown fences and extra junk
        let cleanedText = rawText.trim();

        if (cleanedText.startsWith("```json") || cleanedText.startsWith("``` json")) {
            cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, "");
        }
        if (cleanedText.endsWith("```")) {
            cleanedText = cleanedText.slice(0, -3);
        }

        // Fallback: strictly extract content between first '{' and last '}'
        const firstBrace = cleanedText.indexOf('{');
        const lastBrace = cleanedText.lastIndexOf('}');
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            cleanedText = cleanedText.substring(firstBrace, lastBrace + 1);
        } else {
            throw new Error("Could not find valid JSON structure in AI response.");
        }

        // Final parse
        const parsedJson = JSON.parse(cleanedText);

        // Validate structure
        if (!Array.isArray(parsedJson.summaries) || !Array.isArray(parsedJson.questions)) {
            throw new Error("Parsed JSON is missing 'summaries' or 'questions' array.");
        }

        console.log(`[aiProcessor] Successfully parsed and validated Gemini response.`);
        return parsedJson;

    } catch (error) {
        console.error(`[aiProcessor] Error during AI processing for ${originalFilename}:`, error);
        throw new Error(`AI processing failed: ${error.message}`);
    }
}

module.exports = { processPdfWithAI };
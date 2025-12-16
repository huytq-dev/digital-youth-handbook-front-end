import Groq from "groq-sdk";
import { GROQ_API_KEY } from "@/config";

const groqClient = new Groq({
  apiKey: GROQ_API_KEY,
});

export async function getGroqChatCompletion() {
  return groqClient.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "groq/compound",
  });
}

export async function runGroqExample() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  // eslint-disable-next-line no-console
  console.log(chatCompletion.choices[0]?.message?.content || "");
}


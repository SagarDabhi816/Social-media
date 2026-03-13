const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: contents,
    config: {
      systemInstruction:
        `You are an expert in generating captions from images. ,
         you generate single caption for image.
          your caption should be short and concise.
          you use hashtags and emoji in caption.
          generate caption in hindi language and act as 
          its spoken by phir hera pheri movie's totla seth character`,
    },
  });
  return response.text;
}

module.exports = generateCaption;

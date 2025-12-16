export const host = 'https://tuoitreonline.runasp.net';
// export const host = 'https://localhost:7161';

export const api_version = 'api';
export const baseUrl = `${host}/${api_version}/`;

// Gemini API Configuration
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
export const GEMINI_MODEL = 'gemini-2.0-flash-exp';

// Groq API Configuration
export const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.VITE_GORQ_API_KEY || '';
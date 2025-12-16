export interface AiKnowledgeTopic {
    id: string; // Để map với bài học gốc nếu cần
    title: string;
    summary: string; // Tóm tắt siêu ngắn (1 câu)
    keyConcepts: string[]; // Các khái niệm/luận điểm chính
    solutions: string[]; // Các giải pháp hành động
    quotes: string[]; // Các câu trích dẫn quan trọng (AI cần trích dẫn chính xác)
  }
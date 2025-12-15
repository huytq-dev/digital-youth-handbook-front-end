export interface LearningTopicQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

// Mục con nhỏ (ví dụ: 4.1, 4.2, 4.3...)
export interface LearningContentSubSection {
  title: string; // Tiêu đề mục con (ví dụ: "4.1. Chủ động học tập...")
  content: string; // Nội dung chi tiết
}

// Một phần nội dung trong chủ đề (ví dụ: "Vì sao cần giữ vững lý tưởng...")
export interface LearningContentSection {
  title: string; // Tiêu đề phần (ví dụ: "Lý tưởng cách mạng là gì?")
  content?: string; // Nội dung chi tiết (optional nếu có subsections)
  subSections?: LearningContentSubSection[]; // Mảng các mục con (4.1, 4.2...)
}

export interface LearningTopicContent {
  summary: string; // Tóm tắt ngắn (hiển thị ở trang danh sách)
  videoUrl?: string;
  sections?: LearningContentSection[]; // Mảng các phần nội dung chi tiết
}

// Tài liệu tham khảo
export interface LearningReference {
  id: number; // Số thứ tự (1, 2, 3...)
  text: string; // Nội dung trích dẫn
}

export interface LearningTopic {
  id: string; // slug for URL
  title: string;
  objectives: string[];
  content: LearningTopicContent;
  infographicUrl?: string; // Deprecated: use infographicUrls instead
  infographicUrls?: string[]; // Array of infographic URLs for carousel
  quiz: LearningTopicQuizQuestion[];
  quizId?: string; // Quiz ID để link đến trang quiz đầy đủ
  references?: LearningReference[]; // Tài liệu tham khảo
}



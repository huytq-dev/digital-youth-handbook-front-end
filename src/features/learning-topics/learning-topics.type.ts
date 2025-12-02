export interface LearningTopicQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface LearningTopicContent {
  summary: string;
  videoUrl?: string;
}

export interface LearningTopic {
  id: string; // slug for URL
  title: string;
  objectives: string[];
  content: LearningTopicContent;
  infographicUrl?: string; // Deprecated: use infographicUrls instead
  infographicUrls?: string[]; // Array of infographic URLs for carousel
  quiz: LearningTopicQuizQuestion[];
}



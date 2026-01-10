// Re-export from the new modular structure
// This file is kept for backward compatibility with existing imports
export {
  LEARNING_TOPIC_IDS,
  learningTopicLoaders,
  loadLearningTopics,
  loadLearningTopicById,
  prefetchLearningTopic,
} from "./learning-topics/index";

export { lyTuongTopic } from "./learning-topics/ly-tuong";
export { tuTuongTopic } from "./learning-topics/tu-tuong";
export { vanHoaTopic } from "./learning-topics/van-hoa";
export { anToanMangTopic } from "./learning-topics/an-toan-mang";
export { tinhNguyenTopic } from "./learning-topics/tinh-nguyen";
export { chuyenDoiSoTopic } from "./learning-topics/chuyen-doi-so";

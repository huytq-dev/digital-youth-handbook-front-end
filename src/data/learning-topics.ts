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
export { phongNguaBaoLucXamHaiTopic } from "./learning-topics/phong-ngua-bao-luc-xam-hai";
export { chuyenDoiSoTopic } from "../assets/infographic_chu_de/chu_de_6/chuyen-doi-so";

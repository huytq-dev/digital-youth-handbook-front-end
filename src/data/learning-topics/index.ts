import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

import { lyTuongTopic } from "./ly-tuong";
import { tuTuongTopic } from "./tu-tuong";
import { vanHoaTopic } from "./van-hoa";
import { anToanMangTopic } from "./an-toan-mang";
import { tinhNguyenTopic } from "./tinh-nguyen";
import { chuyenDoiSoTopic } from "./chuyen-doi-so";

// Re-export individual topics for direct access if needed
export {
  lyTuongTopic,
  tuTuongTopic,
  vanHoaTopic,
  anToanMangTopic,
  tinhNguyenTopic,
  chuyenDoiSoTopic,
};

// Combined array for backward compatibility
export const LEARNING_TOPICS: LearningTopic[] = [
  lyTuongTopic,
  tuTuongTopic,
  vanHoaTopic,
  anToanMangTopic,
  tinhNguyenTopic,
  chuyenDoiSoTopic,
];


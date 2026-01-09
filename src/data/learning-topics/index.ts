import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const LEARNING_TOPIC_IDS = [
  "ly-tuong",
  "tu-tuong",
  "van-hoa",
  "an-toan-mang",
  "tinh-nguyen",
  "chuyen-doi-so",
] as const;

export const learningTopicLoaders = {
  "ly-tuong": () => import("./ly-tuong").then((mod) => mod.lyTuongTopic),
  "tu-tuong": () => import("./tu-tuong").then((mod) => mod.tuTuongTopic),
  "van-hoa": () => import("./van-hoa").then((mod) => mod.vanHoaTopic),
  "an-toan-mang": () => import("./an-toan-mang").then((mod) => mod.anToanMangTopic),
  "tinh-nguyen": () => import("./tinh-nguyen").then((mod) => mod.tinhNguyenTopic),
  "chuyen-doi-so": () => import("./chuyen-doi-so").then((mod) => mod.chuyenDoiSoTopic),
} as const;

export async function loadLearningTopics(): Promise<LearningTopic[]> {
  const topics = await Promise.all(
    LEARNING_TOPIC_IDS.map((id) => learningTopicLoaders[id]())
  );
  return topics;
}

export async function loadLearningTopicById(
  id: string
): Promise<LearningTopic | undefined> {
  const loader = learningTopicLoaders[id as keyof typeof learningTopicLoaders];
  if (!loader) return undefined;
  return loader();
}

export function prefetchLearningTopic(id: string): void {
  const loader = learningTopicLoaders[id as keyof typeof learningTopicLoaders];
  if (!loader) return;
  void loader();
}


import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const tuTuongTopic: LearningTopic = {
  id: "tu-tuong",
  title: "Học tập & làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh",
  objectives: [
    "Nắm được những nội dung cốt lõi trong tư tưởng, đạo đức, phong cách Hồ Chí Minh.",
    "Biết vận dụng vào lối sống, cách ứng xử và phương pháp học tập hằng ngày.",
    "Tự xây dựng kế hoạch rèn luyện theo gương Bác trong môi trường học đường.",
  ],
  content: {
    summary:
      "Chủ đề phân tích các phẩm chất đạo đức cách mạng như: yêu nước, cần – kiệm – liêm – chính, chí công vô tư; phong cách sống giản dị, gần gũi; phong cách làm việc khoa học, dân chủ, tôn trọng nhân dân. Qua đó giúp thanh niên soi chiếu và tự điều chỉnh bản thân.",
    videoUrl: "https://www.youtube.com/embed/xn7vF_1r4yg",
  },
  infographicUrl: "/images/learning-topics/hoc-tap-lam-theo-bac.jpg",
  infographicUrls: [
    "https://picsum.photos/seed/tu-tuong-1/800/1000",
    "https://picsum.photos/seed/tu-tuong-2/800/1000",
    "https://picsum.photos/seed/tu-tuong-3/800/1000",
    "https://picsum.photos/seed/tu-tuong-4/800/1000",
    "https://picsum.photos/seed/tu-tuong-5/800/1000",
    "https://picsum.photos/seed/tu-tuong-6/800/1000",
    "https://picsum.photos/seed/tu-tuong-7/800/1000",
    "https://picsum.photos/seed/tu-tuong-8/800/1000",
    "https://picsum.photos/seed/tu-tuong-9/800/1000",
    "https://picsum.photos/seed/tu-tuong-10/800/1000",
  ],
  quiz: [
    {
      id: 1,
      question:
        "Phẩm chất đạo đức nào sau đây gắn liền với tư tưởng, đạo đức Hồ Chí Minh?",
      options: [
        "Cần, kiệm, liêm, chính, chí công vô tư",
        "Cạnh tranh bằng mọi giá",
        "Đề cao chủ nghĩa cá nhân",
        "Chỉ chú trọng vật chất",
      ],
      correctAnswerIndex: 0,
    },
  ],
};


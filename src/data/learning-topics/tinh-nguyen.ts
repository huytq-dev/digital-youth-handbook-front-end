import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const tinhNguyenTopic: LearningTopic = {
  id: "tinh-nguyen",
  title: "Thanh niên tình nguyện - Chung tay xây dựng quê hương",
  objectives: [
    "Hiểu được ý nghĩa của các phong trào thanh niên tình nguyện.",
    "Khơi dậy tinh thần xung kích, sẵn sàng cống hiến cho cộng đồng.",
    "Biết cách tham gia một hoạt động tình nguyện phù hợp với khả năng.",
  ],
  content: {
    summary:
      "Chủ đề giới thiệu các mô hình tình nguyện thiết thực như: tiếp sức mùa thi, mùa hè xanh, hiến máu nhân đạo, hỗ trợ vùng khó khăn, bảo vệ môi trường... Qua đó giúp thanh niên thấy được niềm vui khi cho đi và trách nhiệm với quê hương, đất nước.",
    videoUrl: "https://www.youtube.com/embed/XUqHVyZf9Mk",
  },
  infographicUrl: "/images/learning-topics/thanh-nien-tinh-nguyen.jpg",
  infographicUrls: [
    "https://picsum.photos/seed/tinh-nguyen-1/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-2/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-3/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-4/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-5/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-6/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-7/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-8/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-9/800/1000",
    "https://picsum.photos/seed/tinh-nguyen-10/800/1000",
  ],
  quiz: [
    {
      id: 1,
      question:
        "Ý nghĩa quan trọng nhất của hoạt động thanh niên tình nguyện là gì?",
      options: [
        "Giúp bạn có thêm ảnh đẹp đăng mạng xã hội.",
        "Rèn luyện tinh thần trách nhiệm và đóng góp cho cộng đồng.",
        'Làm cho hồ sơ xin việc "đẹp" hơn.',
        "Giúp bạn tránh phải học thêm ngoài giờ.",
      ],
      correctAnswerIndex: 1,
    },
  ],
};


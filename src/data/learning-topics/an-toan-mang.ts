import type { LearningTopic } from "@/features/learning-topics/learning-topics.type";

export const anToanMangTopic: LearningTopic = {
  id: "an-toan-mang",
  title: "Sử dụng mạng xã hội an toàn, lành mạnh",
  objectives: [
    "Hiểu được cơ hội và rủi ro khi tham gia mạng xã hội.",
    "Biết cách bảo vệ dữ liệu cá nhân và hình ảnh bản thân trên môi trường số.",
    "Hình thành thói quen ứng xử văn minh, tránh tin giả và phát ngôn kích động.",
  ],
  content: {
    summary:
      "Chủ đề cung cấp các kiến thức cơ bản về an toàn thông tin, dấu vết số, cách nhận diện tin giả, lừa đảo trực tuyến. Đồng thời hướng dẫn thanh niên xây dựng \"dấu ấn số\" tích cực, biết chọn lọc nội dung, không chia sẻ thông tin chưa kiểm chứng.",
    videoUrl: "https://www.youtube.com/embed/qNBNzL1RM0A",
  },
  infographicUrl: "/images/learning-topics/mang-xa-hoi-an-toan.jpg",
  infographicUrls: [
    "https://picsum.photos/seed/mang-xa-hoi-1/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-2/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-3/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-4/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-5/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-6/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-7/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-8/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-9/800/1000",
    "https://picsum.photos/seed/mang-xa-hoi-10/800/1000",
  ],
  quiz: [
    {
      id: 1,
      question:
        "Việc nào sau đây giúp bạn sử dụng mạng xã hội an toàn hơn?",
      options: [
        "Đặt mật khẩu dễ nhớ như ngày sinh và chia sẻ cho bạn thân.",
        'Đăng mọi thông tin cá nhân lên trang cá nhân để "không giấu gì nhau".',
        "Bật xác thực hai lớp (2FA) và không bấm vào link lạ.",
        'Tham gia mọi nhóm kín để xem thông tin "nội bộ".',
      ],
      correctAnswerIndex: 2,
    },
  ],
};

